export default async function handler(req, res) {
  const { nomor, bank } = req.query;

  if (!nomor || !bank) {
    return res.status(400).json({ status: 'error', message: 'Parameter nomor dan bank wajib diisi' });
  }

  // Contoh dummy response, nanti diganti pakai API asli
  // Simulasi validasi nomor rekening dan bank
  if (nomor === '1234567890' && bank === 'bca') {
    return res.status(200).json({ status: 'success', nama: 'Budi Santoso' });
  } else {
    return res.status(404).json({ status: 'error', message: 'Data rekening tidak ditemukan' });
  }
}
