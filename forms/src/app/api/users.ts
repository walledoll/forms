import { User } from "@/entities/model/users"

const API_URL = 'https://forms-server-2gqx.onrender.com/api/v1';

export  const fetchUsers = async():Promise<User[]> => {
  const res = await fetch(`${API_URL}/users`);
  if(!res.ok) throw new Error('Error loading users');
  return res.json();
}

export const fetchUser = async(id: number): Promise<User> => {
  const res = await fetch(`${API_URL}/users/${id}`);
  if(!res.ok) throw new Error(`Error fetch ${id} user`);
  return res.json();
}

export const createUser = async (user: User): Promise<User> => {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Error creating user');
  return res.json();
}

export const updateUser = async (user: User): Promise<User> => {
  const res = await fetch(`${API_URL}/users/${user.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  });
  if(!res.ok) throw new Error('Error editing user');
  return res.json();
}

export const deleteUser = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if(!res.ok) throw new Error('Error deleting user');
}

export const login = async (user:Pick<User, "password" | "email">):Promise<Pick<User,"password" | "email">> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user);
  });
  if(!res.ok) throw new Error(`Error login ${user.email} login`);
  return res.json();
}

export const logout = async (): Promise<void> => {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
  });
  if(!res.ok) throw new Error('Error user logout');
}

export const getMe = async (): Promise<{message: string}> => {
  const res = await fetch(`${API_URL}/auth/me`);
  if(!res.ok) throw new Error('Error auth me');
  return res.json();
}
