class OffCanvas {
  buildOffCanvas = async () => {
    const div = document.createElement("div");
    div.innerHTML = `
          <div
        class="offcanvas offcanvas-start bg-dark"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header ">
          <h5
            class="offcanvas-title"
            id="offcanvasExampleLabel"
            style="color: white"
          >
            Navegación
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white text-reset "
            data-bs-dismiss="offcanvas"
            aria-label="Close "
            style="color: white"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div>
            <div class="sidebar_menu mb-3">
              <a href="#" class="sidebar_menu_select"
                ><i class="fas fa-house"></i>Inicio</a
              >
              <a href="error404.html"><i class="fas fa-search"></i>Buscar</a>
              <a href="#"><i class="fas fa-database"></i>Biblioteca</a>
            </div>
          </div>
          <div class="sidebar_menu_create">
            <i class="fa-solid fa-circle-plus">
              <span>Create Playlist</span>
            </i>
            <div class="sidebar_menu_item">
              <img
                src="../../docs/img/podcasts.png"
                alt=""
                height="30px"
                width="30px"
              />
              <span>Podcasts</span>
            </div>
            <div class="sidebar_menu_item">
              <img
                src="../../docs/img/liked.png"
                alt="liked-songs"
                width="30px"
                height="30px"
              />
              <span>Liked songs</span>
            </div>
          </div>
          <div class="sidebar_playlists">
            <a href="#">Playlist 1</a>
            <a href="#">Playlist 2</a>
            <a href="#">Playlist 3</a>
            <a href="#">Playlist 4</a>
            <a href="#">Playlist 5</a>
            <a href="#">Playlist 6</a>
          </div>
          <div class="sidebar_playlists">
            <a href="#">Playlist 1</a>
            <a href="#">Playlist 2</a>
            <a href="#">Playlist 3</a>
            <a href="#">Playlist 4</a>
            <a href="#">Playlist 5</a>
            <a href="#">Playlist 6</a>
          </div>
    `;
    return div;
  };
}
export default OffCanvas;
