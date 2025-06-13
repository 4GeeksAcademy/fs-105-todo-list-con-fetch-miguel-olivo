import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  createUser,
  getUser,
  addTask,
  deleteTask,
} from "../../services/fetchs";

const Home = () => {
  const [tarea, setTarea] = useState("");
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaTareas, setListaTareas] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [respOk, setRespOk] = useState(false);
  const myUser = "WOODS";

  useEffect(() => {
    handleObtenerUsuarios();
  }, []);

  useEffect(() => {
    if (!respOk) return;
    const existe = listaUsuarios.some((u) => u.name === myUser);
    if (!existe) {
      createUser(myUser);
    } else {
      getUser(myUser).then(setListaTareas);
    }
  }, [listaUsuarios]);

  const handleObtenerUsuarios = async () => {
    const usuarios = await getAllUsers();
    setListaUsuarios(usuarios);
    if (usuarios) {
      setRespOk(true);
    }
  };

  const handleCreateTarea = async () => {
    if (tarea.trim() === "") return;
    await addTask(myUser, tarea);
    setTarea("");
    const nuevasTareas = await getUser(myUser);
    setListaTareas(nuevasTareas);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    const nuevasTareas = await getUser(myUser);
    setListaTareas(nuevasTareas);
  };

  // 🎨 Estilos manuscritos tipo hoja
  const styles = {
    nota: {
      background: "#fff8dc",
      padding: "20px",
      width: "400px",
      margin: "auto",
      marginTop: "30px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      border: "none",
      borderBottom: "2px solid #ccc",
      background: "transparent",
      outline: "none",
    },
    tarea: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px dashed #ccc",
      transition: "background 0.3s",
    },
    botonX: {
      cursor: "pointer",
      color: "brown",
      fontWeight: "bold",
      marginLeft: "10px",
      visibility: "hidden",
    },
    botonVisible: {
      visibility: "visible",
    },
    mensajeVacio: {
      textAlign: "center",
      marginTop: "20px",
      color: "#888",
      fontStyle: "italic",
    },
    titulo: {
      textAlign: "center",
      fontSize: "20px",
      marginBottom: "20px",
      color: "#333",
    },
    botonCrear: {
      marginTop: "10px",
      width: "100%",
      padding: "10px",
      fontWeight: "bold",
      fontFamily: "'Comic Sans MS', cursive",
      backgroundColor: "#deb887",
      border: "none",
      cursor: "pointer",
      borderRadius: "6px",
    },
  };

  return (
    <div style={styles.nota}>
      <h1 style={styles.titulo}>📝 Lista de tareas de {myUser}</h1>

      <input
        type="text"
        placeholder="Introduce una nueva tarea..."
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && tarea.trim() !== "") {
            handleCreateTarea();
          }
        }}
        style={styles.input}
      />
      <button onClick={handleCreateTarea} style={styles.botonCrear}>
        Crear
      </button>

      {listaTareas.length === 0 ? (
        <p style={styles.mensajeVacio}>No hay tareas todavía...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {listaTareas.map((t, index) => (
            <li
              key={index}
              style={styles.tarea}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span>{t.label}</span>
              <span
                style={{
                  ...styles.botonX,
                  ...(hoveredIndex === index ? styles.botonVisible : {}),
                }}
                onClick={() => handleDelete(t.id)}
              >
                ✖
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
