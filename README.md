# youtube-downloader-be

YouTube videolarının indirme bağlantılarını ve kalite seçeneklerini döndüren basit bir Node.js backend.

## Kurulum

```bash
npm install
```

## Çalıştırma

```bash
npm start
```

## API Kullanımı

### GET /

Servisin çalıştığını test etmek için:

```
GET /
```
Yanıt:
```
service working
```

### POST /api/download

YouTube video URL'si gönderin, kalite seçenekleriyle indirme bağlantılarını alın.

#### Request

```
POST /api/download
Content-Type: application/json

{
  "url": "https://www.youtube.com/watch?v=bOxc812TqSA"
}
```

#### Response

```
{
  "title": "Video Başlığı",
  "videoId": "bOxc812TqSA",
  "thumbnails": [ ... ],
  "links": [
    {
      "quality": "720p",
      "container": "mp4",
      "url": "https://..."
    },
    ...
  ]
}
```

## Notlar
- Şimdilik sadece video (sesli) linkleri döner.
- Herhangi bir rate limit veya authentication yoktur.
