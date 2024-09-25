document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/videos')
      .then(response => response.json())
      .then(videos => {
        const videoList = document.getElementById('video-list');
        videos.forEach(video => {
          const videoElement = document.createElement('video');
          videoElement.src = `/uploads/${video.filename}`;
          videoElement.controls = true;
          videoList.appendChild(videoElement);
        });
      });
  });
  