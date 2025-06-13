import express from 'express';
import ytdl from 'ytdl-core';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('service working');
});

app.post('/api/download', async (req, res) => {
  const { url } = req.body;
  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Geçersiz veya eksik YouTube URL' });
  }
  try {
    const info = await ytdl.getInfo(url);
    const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
    const links = formats.map(f => ({
      quality: f.qualityLabel,
      container: f.container,
      url: f.url
    }));
    res.json({
      title: info.videoDetails.title,
      videoId: info.videoDetails.videoId,
      thumbnails: info.videoDetails.thumbnails,
      links
    });
  } catch (err) {
    res.status(500).json({ error: 'Video bilgisi alınamadı', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
