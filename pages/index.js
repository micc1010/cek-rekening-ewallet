import { useState } from 'react';

export default function Home() {
  const [type, setType] = useState('rekening'); 
  const [nomor, setNomor] = useState('');
  const [bankOrProvider, setBankOrProvider] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const bankOptions = ['bca', 'mandiri', 'bri', 'bni'];
  const ewalletOptions = ['ovo', 'gopay', 'dana'];

  async function handleCheck() {
    if (!nomor || !bankOrProvider) {
      alert('Mohon isi nomor dan bank/provider');
      return;
    }
    setLoading(true);
    setResult(null);

    const query = new URLSearchParams({
      nomor,
      ...(type === 'rekening' ? { bank: bankOrProvider } : { provider: bankOrProvider }),
    });

    const endpoint = type === 'rekening' ? '/api/cek-rekening' : '/api/cek-ewallet';

    try {
      const res = await fetch(`${endpoint}?${query.toString()}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ status: 'error', message: 'Terjadi kesalahan' });
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 480, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Cek Rekening & E-Wallet</h1>

      <div style={{ marginBottom: 10 }}>
        <label>
          <input
            type="radio"
            checked={type === 'rekening'}
            onChange={() => setType('rekening')}
          />{' '}
          Rekening Bank
        </label>{' '}
        <label>
          <input
            type="radio"
            checked={type === 'ewallet'}
            onChange={() => setType('ewallet')}
          />{' '}
          E-Wallet
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <input
          placeholder={type === 'rekening' ? 'Nomor Rekening' : 'Nomor E-wallet'}
          value={nomor}
          onChange={e => setNomor(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />

        <select
          value={bankOrProvider}
          onChange={e => setBankOrProvider(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        >
          <option value="">-- Pilih {type === 'rekening' ? 'Bank' : 'Provider'} --</option>
          {(type === 'rekening' ? bankOptions : ewalletOptions).map(x => (
            <option key={x} value={x}>{x.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleCheck}
        disabled={loading}
        style={{ width: '100%', padding: 10, backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        {loading ? 'Sedang Mengecek...' : 'Cek'}
      </button>

      {result && (
        <div style={{ marginTop: 20, padding: 15, border: '1px solid #ddd' }}>
          {result.status === 'success' ? (
            <>
              <strong>Nama Pemilik:</strong> {result.nama || '-'} <br />
              <strong>Status:</strong> {result.status}
            </>
          ) : (
            <span style={{ color: 'red' }}>{result.message || 'Data tidak ditemukan'}</span>
          )}
        </div>
      )}
    </div>
  );
}
