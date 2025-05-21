export default async function handler(req, res) {
  const { nomor, bank } = req.query;

  if (!nomor || !bank) {
    return res.status(400).json({ status: 'error', message: 'Parameter nomor dan bank wajib diisi' });
  }

  try {
    const response = await fetch(`https://apidev.biz.id/api/cek-rekening?nomor=${nomor}&bank=${bank}&apikey=8b48ee72361111f0ba00bc24113c8a5effCGRRSnnG`);

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Gagal memanggil API' });
  }
}
