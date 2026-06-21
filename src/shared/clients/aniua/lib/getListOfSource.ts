interface VideoSource {
  type: string;
  url: string;
  quality: string;
}

interface VideoInput {
  video: {
    hls?: string | { url: string };
    webm?: string | { url: string };
    '1080p'?: string;
    '720p'?: string;
    file?: string;
  };
}

const getListOfSources = (video: [VideoInput, ...unknown[]] | unknown): VideoSource[] | null => {
  if (!Array.isArray(video) || !video[0] || !video[0].video) return null;

  const vide_quality_list = [];
  const video_object = video[0].video;

  if (typeof video_object?.hls === 'object' && video_object?.hls?.url)
    vide_quality_list.push({
      type: 'hls',
      url: video_object.hls.url,
      quality: 'auto',
    });

  if (typeof video_object?.hls === 'string')
    vide_quality_list.push({
      type: 'hls',
      url: video_object.hls,
      quality: 'auto',
    });

  if (typeof video_object?.webm === 'object' && video_object?.webm?.url)
    vide_quality_list.push({
      type: 'webm',
      url: video_object.webm.url,
      quality: 'auto',
    });

  if (typeof video_object?.webm === 'string')
    vide_quality_list.push({
      type: 'webm',
      url: video_object.webm,
      quality: 'auto',
    });

  if (video_object?.['1080p'])
    vide_quality_list.push({
      type: 'webm',
      url: video_object['1080p'],
      quality: '1080',
    });
  if (video_object?.['720p'])
    vide_quality_list.push({
      type: 'webm',
      url: video_object['720p'],
      quality: '720',
    });

  if (video_object?.file) {
    vide_quality_list.push({
      type: 'hls',
      url: video_object?.file,
      quality: '720',
    });
  }

  return vide_quality_list;
};

export default getListOfSources;
