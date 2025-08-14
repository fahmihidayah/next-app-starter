'use server';

import { db } from '@/libs/drizzle-utils';
import { todos, type Todo, type NewTodo } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getTodos(): Promise<Todo[]> {
  try {
    const result = await db.select().from(todos).orderBy(desc(todos.createdAt));
    return result;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw new Error('Failed to fetch todos');
  }
}

export async function getTodo(id: number): Promise<Todo | null> {
  try {
    const result = await db.select().from(todos).where(eq(todos.id, id)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching todo:', error);
    throw new Error('Failed to fetch todo');
  }
}

export async function createTodo(data: Pick<NewTodo, 'title' | 'description'>): Promise<Todo> {
  try {
    const result = await db.insert(todos).values({
      title: data.title,
      description: data.description,
    }).returning();
    
    revalidatePath('/');
    return result[0];
  } catch (error) {
    console.error('Error creating todo:', error);
    throw new Error('Failed to create todo');
  }
}

export async function updateTodo(id: number, data: Partial<Pick<NewTodo, 'title' | 'description' | 'completed'>>): Promise<Todo> {
  try {
    const result = await db.update(todos)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(todos.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error('Todo not found');
    }
    
    revalidatePath('/');
    return result[0];
  } catch (error) {
    console.error('Error updating todo:', error);
    throw new Error('Failed to update todo');
  }
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    const result = await db.delete(todos).where(eq(todos.id, id)).returning();
    
    if (result.length === 0) {
      throw new Error('Todo not found');
    }
    
    revalidatePath('/');
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw new Error('Failed to delete todo');
  }
}

export async function toggleTodoComplete(id: number): Promise<Todo> {
  try {
    const todo = await getTodo(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    
    return updateTodo(id, { completed: !todo.completed });
  } catch (error) {
    console.error('Error toggling todo:', error);
    throw new Error('Failed to toggle todo');
  }
}