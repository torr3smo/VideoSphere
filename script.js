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
  document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('upload-form');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData();
    const videoFile = document.getElementById('video-file').files[0];
    formData.append('video', videoFile);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.text())
    .then(result => {
      alert(result); // Mostra mensagem de sucesso
      loadVideos();  // Atualiza a lista de vídeos
    })
    .catch(error => console.error('Erro ao enviar o vídeo:', error));
  });

  loadVideos(); // Carrega vídeos ao iniciar
});

function loadVideos() {
  fetch('/api/videos')
    .then(response => response.json())
    .then(videos => {
      const videoList = document.getElementById('video-list');
      videoList.innerHTML = ''; // Limpa lista anterior
      videos.forEach(video => {
        const videoElement = document.createElement('video');
        videoElement.src = `/uploads/${video.filename}`;
        videoElement.controls = true;
        videoList.appendChild(videoElement);
      });
    });
}
