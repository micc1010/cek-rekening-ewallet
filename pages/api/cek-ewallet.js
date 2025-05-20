export default async function handler(req, res) {
  const { nomor, provider } = req.query;

  if (!nomor || !provider) {
    return res.status(400).json({ status: 'error', message: 'Parameter nomor dan provider wajib diisi' });
  }

  // Contoh dummy response, nanti diganti pakai API asli
  // Simulasi validasi nomor e-wallet dan provider
  if (nomor === '08123456789' && provider === 'ovo') {
    return res.status(200).json({ status: 'success', nama: 'Siti Aminah' });
  } else {
    return res.status(404).json({ status: 'error', message: 'Data e-wallet tidak ditemukan' });
  }
}
