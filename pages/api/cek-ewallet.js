export default async function handler(req, res) {
  const { nomor, provider } = req.query;

  if (!nomor || !provider) {
    return res.status(400).json({ status: 'error', message: 'Parameter nomor dan provider wajib diisi' });
  }

  try {
    const response = await fetch(`683c0108356211f0af66bc24113c8a5eymydpQCBvH`, {
      headers: {
        'Authorization': 'Bearer API_KEY_KAMU',
      }
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Gagal memanggil API' });
  }
}
