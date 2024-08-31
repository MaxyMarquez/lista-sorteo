import { useState } from "react";
import "./App.css";

function App() {
  const [dataForm, setDataForm] = useState({
    tamer: "",
    egg: "",
  });

  const [table, setTable] = useState([]);
  const [winnerPositions, setWinnerPositions] = useState([]); // Lista de posiciones ganadoras

  const handleForm = (e) => {
    const { name, value } = e.target;

    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tamerName = dataForm.tamer.trim().toLowerCase(); // Normalizar el nombre del tamer

    // Buscar si el tamer ya existe en la tabla
    const existingIndex = table.findIndex(
      (item) => item.tamer.toLowerCase() === tamerName
    );

    if (existingIndex !== -1) {
      // Si el tamer existe, actualizar la cantidad de huevos
      const updatedTable = [...table];
      updatedTable[existingIndex].egg =
        parseInt(updatedTable[existingIndex].egg) + parseInt(dataForm.egg);
      setTable(updatedTable);
    } else {
      // Si el tamer no existe, agregarlo a la tabla
      setTable((prev) => [...prev, { ...dataForm, tamer: tamerName }]);
    }

    setDataForm({ tamer: "", egg: "" }); // Limpiar el formulario después de agregar
  };

  const handleWinners = (e) => {
    const positions = e.target.value
      .split(",")
      .map((pos) => parseInt(pos.trim(), 10));
    setWinnerPositions(positions);
  };

  const isWinner = (index) => winnerPositions.includes(index + 1); // Comparar con índices basados en 1

  return (
    <>
      <div className="flex flex-col justify-center w-[992px] bg-gray-900 p-10 rounded-2xl">
        <form
          className="flex justify-between gap-3 w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-3">
            <input
              type="text"
              name="tamer"
              value={dataForm.tamer}
              className="bg-gray-800 appearance-none border border-transparent rounded w-52 py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:border-gray-200"
              placeholder="Tamer"
              onChange={handleForm}
              required
            />

            <input
              type="number"
              name="egg"
              value={dataForm.egg}
              className="bg-gray-800 appearance-none border border-transparent rounded w-52 py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:border-gray-200"
              required
              placeholder="Huevos"
              onChange={handleForm}
              min={0}
            />
          </div>

          <button
            type="submit"
            className="flex items-center h-10 py-3 px-4 bg-gray-800 text-white rounded"
          >
            Agregar
          </button>
        </form>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Posiciones ganadoras (ej. 1,2,3)"
            className="bg-gray-800 appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:border-gray-200"
            onChange={handleWinners}
          />
        </div>

        <table className="w-full mt-10">
          <thead className="rounded border-b border-b-slate-50/25 text-gray-300">
            <tr className="">
              <th className="py-3 text-white">#</th>
              <th className="py-3 text-white">Tamer</th>
              <th className="py-3 text-white">Huevos</th>
              <th className="py-3 text-white">Ganador</th>
            </tr>
          </thead>
          <tbody>
            {table
              .sort((a, b) => b.egg - a.egg)
              .map((item, index) => (
                <tr className="border-b border-b-slate-50/10" key={index}>
                  <td className="py-3 text-gray-300 w-12 text-center">
                    {index + 1}
                  </td>
                  <td className="py-3 text-gray-300">{item.tamer}</td>
                  <td className="py-3 text-gray-300 text-center">{item.egg}</td>
                  <td className="py-3 text-gray-300 text-center">
                    {isWinner(index) ? "WINNER" : "LOOSER"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
