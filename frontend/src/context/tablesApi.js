const API_URL = "https://finalproject-8lp2.onrender.com/api/tables";

export const fetchTables = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch tables");
  return res.json();
};

export const addTable = async (table) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(table),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to add table");
  return data;
};

export const deleteTable = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete table");
  return true;
};
