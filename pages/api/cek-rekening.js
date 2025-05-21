export default async function handler(req, res) {
  const { nomor, bank } = req.query;

  if (!nomor || !bank) {
    return res.status(400).json({ status: 'error', message: 'Parameter nomor dan bank wajib diisi' });
  }

  try {
    // Ganti URL di bawah dengan URL API dari apidev.biz.id dan sesuaikan parameter
    const response = await fetch(`683c0108356211f0af66bc24113c8a5eymydpQCBvH`, {
      headers: {
        'Authorization': 'Bearer API_KEY_KAMU',  // kalau ada token, masukkan di sini
      }
    });

    const data = await response.json();

    // Kirim balik hasil API apidev.biz.id ke frontend
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Gagal memanggil API' });
  }
}
