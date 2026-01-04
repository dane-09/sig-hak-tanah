const BASE_URL = "http://localhost:3001";
const API = `${BASE_URL}/hak-tanah`;

/* ================================
   PAGINATION (10 DATA)
================================ */
export const getHakTanah = async (page = 1) => {
  const res = await fetch(`${API}?page=${page}`);
  return res.json();
};

/* ================================
   SEMUA DATA (DASHBOARD & MAP)
================================ */
export const getAllHakTanah = async () => {
  const res = await fetch(`${API}/all`);
  return res.json();
};

/* ================================
   CREATE
================================ */
export const createHakTanah = async (data) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

/* ================================
   UPDATE
================================ */
export const updateHakTanah = async (fid, data) => {
  const res = await fetch(`${API}/${fid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

/* ================================
   DELETE
================================ */
export const deleteHakTanah = async (fid) => {
  const res = await fetch(`${API}/${fid}`, {
    method: "DELETE",
  });
  return res.json();
};
