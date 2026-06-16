# isteğin nedir — Cloudflare Worker (kontrollü sürüm)

Aynı tasarım, tek farkı: bir hata olduğunda artık **gerçek sebebi ekranda gösteriyor**
(anahtar sorunu mu, bakiye mi yok, vs.). Böylece "..." da takılıp neyin patladığını
bilememe durumu bitti.

## Güncelleme (zaten deploy ettiysen)
Sadece eski `worker.js`'i bu yenisiyle değiştir, sonra:

```bash
npx wrangler deploy
```

Adres değişmez, aynı kalır:
`https://istegin-nedir.<hesabın>.workers.dev`

## Sıfırdan kurulum
```bash
# 1) Bu klasörün içine gir
cd istegin-nedir-worker

# 2) Cloudflare'e giriş
npx wrangler login

# 3) API anahtarını secret olarak ekle (sorunca GEÇERLİ anahtarı yapıştır)
npx wrangler secret put ANTHROPIC_API_KEY

# 4) Yayınla
npx wrangler deploy
```

## Önemli — çalışması için iki şart
1. **Geçerli (iptal edilmemiş) bir API anahtarı.** console.anthropic.com → API Keys
2. **Hesapta kredi/bakiye.** console.anthropic.com → Billing
   (Anthropic API ücretsiz değil; bakiye 0 ise her istek reddedilir.)

Bu ikisinden biri eksikse, yeni sürüm sana ekranda tam olarak hangisinin
eksik olduğunu söyleyecek.

## Ayarlar
- Model: `worker.js` içinde `model: 'claude-sonnet-4-6'`
- Ajan kişiliği / talimat: `worker.js` içindeki `SYSTEM` değişkeni
- Yanıt uzunluğu: `max_tokens: 1000`

## Yerel test
```bash
npx wrangler dev
```
`http://localhost:8787` üzerinden çalışır.
