// ==========================================
// TORTA DE CUMPLEAÑOS
// Edita SOLO este bloque para cambiar los textos.
// (Opcional: también puedes definir EVENTO.torta
//  en config.js con las mismas claves; tiene prioridad.)
// ==========================================

(function () {

  "use strict";

  const TORTA = {

    eyebrow: "Hoy celebramos",

    titulo: "¡Pide un deseo!",

    pista: "Toca la torta para soplar las velas",

    edad: "15"

  };


  const datos = Object.assign(
    {},
    TORTA,
    (typeof EVENTO !== "undefined" && EVENTO.torta) || {}
  );


  function poner(id, texto) {

    const el = document.getElementById(id);

    if (!el) {
      return;
    }

    const valor = String(texto == null ? "" : texto).trim();

    el.textContent = valor;

    el.hidden = valor === "";

  }


  function iniciar() {

    poner("tortaEyebrow", datos.eyebrow);
    poner("tortaTitulo", datos.titulo);
    poner("tortaPista", datos.pista);
    poner("tortaEdad", datos.edad);

    const torta = document.getElementById("torta");

    if (!torta) {
      return;
    }

    let temporizador = null;

    // Sopla las velas y las vuelve a encender a los 3.5 s
    function soplar() {

      if (torta.classList.contains("apagadas")) {
        return;
      }

      torta.classList.add("soplando", "apagadas");
      torta.setAttribute("aria-pressed", "true");

      setTimeout(function () {
        torta.classList.remove("soplando");
      }, 500);

      clearTimeout(temporizador);

      temporizador = setTimeout(function () {
        torta.classList.remove("apagadas");
        torta.setAttribute("aria-pressed", "false");
      }, 3500);

    }

    torta.addEventListener("click", soplar);

    torta.addEventListener("keydown", function (e) {

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        soplar();
      }

    });

  }


  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }

})();