export default async function handler(req, res) {
  const { nomor, provider } = req.query;

  if (!nomor || !provider) {
    return res.status(400).json({ status: 'error', message: 'Parameter nomor dan provider wajib diisi' });
  }

  try {
    const response = await fetch(`https://apidev.biz.id/api/cek-ewallet?nomor=${nomor}&provider=${provider}&apikey=8b48ee72361111f0ba00bc24113c8a5effCGRRSnnG`);

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Gagal memanggil API' });
  }
}
