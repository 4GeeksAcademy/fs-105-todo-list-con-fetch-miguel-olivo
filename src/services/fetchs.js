const url_base = "https://playground.4geeks.com/todo/";
const user = "Miguel96";

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${url_base}users`);
    if (!response.ok) {
      throw new Error("Error al cargar la lista de usuarios");
    }
    const data = await response.json();
    console.log(data);
    return data.users;
  } catch (error) {
    alert("error al cargar los usuarios");
  }
};

export const createUser = async (userName) => {
  try {
    const response = await fetch(`${url_base}users/${userName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error al crear al usuario");
    }
    return alert("Usuario creado exitosamente");
  } catch (error) {
    alert("error al cargar los usuarios");
  }
};

export const getUser = async (userName) => {
  try {
    const response = await fetch(`${url_base}users/${userName}`);
    if (!response.ok) {
      throw new Error("Error al cargar la lista de tareas");
    }
    const data = await response.json();
    console.log(data.todos);
    return data.todos;
  } catch (error) {
    alert("Error al cargar la lista:", error);
  }
};

export const addTask = async (myUser, tarea) => {
  try {
    const response = await fetch(`${url_base}todos/${myUser}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: tarea,
        done: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al crear la tarea");
    }
    return alert("Tarea creada exitosamente");
  } catch (error) {
    alert("Error al cargar la tarea");
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${url_base}todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la tarea");
    }

    return alert("Tarea eliminada exitosamente");
  } catch (error) {
    alert("Error al eliminar la tarea:", error);
  }
};
