// Configurações do EmailJS
const EMAILJS_SERVICE_ID = "service_xv2t1ao";
const EMAILJS_TEMPLATE_ID = "template_gip2me9";
const EMAILJS_USER_ID = "9dD831WDZMpRIqpY2";

// Inicializa EmailJS
if (typeof emailjs !== "undefined") {
  emailjs.init(EMAILJS_USER_ID);
} else {
  console.warn("EmailJS não carregado - verifique o script CDN.");
}

// Dados dos modems
const modemsData = {
  SAGEMCOM: [
    "SMBS000F671F",
    "SMBS0007192E",
    "SMBS000FFBDC",
    "SMBS001041F6",
    "SMBS00105C39",
    "SMBS0005B40C",
    "SMBS002723B5",
    "SMBS0066F8B6",
    "SMBS003EA46B",
    "SMBS00377D8C",
    "SMBS00486389",
    "SMBS0052BA17",
    "SMBS04003340",
    "SMBS002A26C9",
    "SMBS001DBF1F",
    "SMBS000FBA80",
    "SMBS002282AA",
    "SMBS0066FA07",
    "SMBS00FA321F",
    "SMBS00501A35",
    "SMBS04008E98",
    "SMBS00537E94",
    "SMBS00537BF9",
    "SMBS004185AE",
    "SMBS00537DD3",
    "SMBS003E9A48",
    "SMBS004014EF",
    "SMBS004380DC",
    "SMBS003EBC97",
    "SMBS00418C96",
    "SMBS00302DFE",
    "SMBS0057DBA5",
    "SMBS00412372",
    "SMBS004A673D",
    "SMBS0057ED0C",
    "SMBS001C38DA",
    "SMBS004FFC87",
    "SMBS00416DA6",
    "SMBS006708B0",
    "SMBS00538D1C",
    "SMBS0066E9A4",
    "SMBS00504953",
    "SMBS00303A14",
    "SMBS002A9296",
    "SMBS0067055B",
    "SMBS004FDAED",
    "SMBS00538E80",
    "SMBS0057F6DF",
    "SMBS004FD975",
    "SMBS003ED276",
    "SMBS00405266",
    "SMBS00148736",
    "SMBS000E8385",
  ],
  KAON: [
    "KAON09012EDD",
    "KAON0901AA7D",
    "KAON0901DE86",
    "KAON090104EF",
    "KAON0901D010",
    "KAON0901A132",
    "KAON0901C678",
    "KAON0900410D",
    "KAON09020FAE",
    "KAON0900ED1C",
    "KAON090100B2",
    "KAON09011A9E",
    "KAON0900519D",
    "KAON09007232",
    "KAON09019292",
    "KAON09000E3F",
    "KAON09028D79",
    "KAON0902915B",
    "KAON0900B1C7",
    "KAON0900FB77",
    "KAON09028723",
    "KAON0900C847",
    "KAON09029105",
  ],
  FIBERHOME: [
    "FHTT9549F970",
    "FHTT954B1178",
    "FHTT95492B00",
    "FHTT23AE3208",
    "FHTT9548ED88",
    "FHTT95440B30",
    "FHTT23ACCD78",
    "FHTT23A821F8",
    "FHTT23AE2EB8",
  ],
  ZTE: [
    "ZTEGCB314EC8",
    "ZTEGCB311F69",
    "ZTEGCE07C076",
    "ZTEGCB31508E",
    "ZTEGCE089ED7",
    "ZTEGCE07BFDF",
    "ZTEGD4F1BE11",
    "ZTEGCB332D76",
    "ZTEGCE1228E9",
    "ZTEGD4F1DA67",
    "ZTEGD4F1C422",
    "ZTEGDAD357AE",
  ],
  TECHNICOLOR: [
    "TMBB0056758E",
    "TMBB0056F1C2",
    "TMBB0053F77E",
    "TMBB0055C847",
    "TMBB0056F522",
    "TMBB00565747",
    "TMBB0055F147",
    "TMBB00567C6C",
  ],
  "BLU-CASTLE": [
    "FTTH098EB0C0",
    "FTTH0A11BD78",
    "FTTH0B27F7F0",
    "FTTH08923580",
    "FTTH0A1186C0",
    "FTTH08FB37A0",
    "BCSK4896A08C",
  ],
  TELLESCOM: ["TLCT00006196", "TLCT00007213"],
};

const statsData = {
  SAGEMCOM: 53,
  KAON: 22,
  FIBERHOME: 9,
  ZTE: 11,
  TECHNICOLOR: 8,
  "BLU-CASTLE": 7,
  TELLESCOM: 2,
};

// Função para criar estatísticas
function createStats() {
  const statsContainer = document.getElementById("stats");
  let html = "";

  Object.entries(statsData).forEach(([model, count]) => {
    html += `
            <div class="stat-item" data-model="${model}">
                <div class="stat-number">${count}</div>
                <div class="stat-label">${model}</div>
            </div>
        `;
  });

  statsContainer.innerHTML = html;

  document.querySelectorAll(".stat-item").forEach((item) => {
    item.addEventListener("click", () => {
      if (item.dataset.model.toLowerCase() !== "total") {
        const modelSection = document.querySelector(
          `.model-group[data-model="${item.dataset.model}"]`,
        );
        if (modelSection) {
          modelSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
}

// Função para criar lista de modems (toggle/select múltiplo com event delegation)
function createModemsList() {
  const container = document.getElementById("modemsContainer");
  let html =
    '<h2 class="section-title">Lista Completa de Séries por Modelo</h2>';

  Object.entries(modemsData).forEach(([model, series]) => {
    html += `
      <div class="model-group" data-model="${model}">
        <div class="model-header">${model} (${series.length} unidades)</div>
        <ul class="series-list">
    `;

    series.forEach((seriesId) => {
      // tabindex e role para acessibilidade
      html += `<li class="series-item" data-series="${seriesId}" tabindex="0" role="button" aria-pressed="false">${seriesId}</li>`;
    });

    html += "</ul></div>";
  });

  container.innerHTML = html;

  // garante que tudo comece visível (como no teu código original)
  document.querySelectorAll(".model-group").forEach((group) => {
    group.classList.add("show");
  });
  document.querySelectorAll(".series-item").forEach((item) => {
    item.classList.add("show");
  });

  // Event delegation: toggla seleção (marca/desmarca) sem remover outras
  // OBS: se já houver um listener pode duplicar; chamamos createModemsList() apenas no load,
  // portanto aqui fica seguro adicionar.
  container.addEventListener("click", (e) => {
    const item = e.target.closest(".series-item");
    if (!item) return;

    // toggle da classe selecionada
    const isSelected = item.classList.toggle("selecionada");

    // atualiza atributo aria-pressed para acessibilidade
    item.setAttribute("aria-pressed", isSelected ? "true" : "false");
  });

  // permite selecionar/desselecionar com Enter/Space no teclado
  container.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const item = e.target.closest(".series-item");
      if (!item) return;
      e.preventDefault(); // evita scroll ao apertar espaço
      const isSelected = item.classList.toggle("selecionada");
      item.setAttribute("aria-pressed", isSelected ? "true" : "false");
    }
  });
}

// Função de busca
function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearch");

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    document.querySelectorAll(".model-group").forEach((group) => {
      const modelName = group.dataset.model.toLowerCase();
      const items = group.querySelectorAll(".series-item");
      let visibleCount = 0;

      items.forEach((item) => {
        const seriesId = item.dataset.series.toLowerCase();

        if (
          query === "" ||
          modelName.includes(query) ||
          seriesId.includes(query)
        ) {
          item.classList.add("show");
          visibleCount++;
        } else {
          item.classList.remove("show");
        }
      });

      if (visibleCount > 0 || query === "") {
        group.classList.add("show");
      } else {
        group.classList.remove("show");
      }
    });
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));
    searchInput.focus();
  });
}

// Função para assinatura digital
function initSignaturePad() {
  const canvas = document.getElementById("signature-canvas");
  // Ajusta tamanho do canvas para dispositivos de alto DPI
  function resizeCanvasToDisplaySize(canvas) {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (
      canvas.width !== Math.floor(w * ratio) ||
      canvas.height !== Math.floor(h * ratio)
    ) {
      canvas.width = Math.floor(w * ratio);
      canvas.height = Math.floor(h * ratio);
      canvas.getContext("2d").scale(ratio, ratio);
    }
  }
  resizeCanvasToDisplaySize(canvas);
  window.addEventListener("resize", () => resizeCanvasToDisplaySize(canvas));

  const signaturePad = new SignaturePad.default()
    ? new SignaturePad.default(canvas, {
        backgroundColor: "rgb(255,255,255)",
        penColor: "rgb(0,0,0)",
      })
    : new SignaturePad(canvas, {
        backgroundColor: "rgb(255,255,255)",
        penColor: "rgb(0,0,0)",
      });

  document.getElementById("clear-signature").addEventListener("click", () => {
    signaturePad.clear();
    document.getElementById("signature-message").style.display = "none";
  });

  document.getElementById("submit-signature").addEventListener("click", () => {
    if (signaturePad.isEmpty()) {
      showMessage("Por favor, assine antes de enviar!", "error");
      return;
    }

    const dataURL = signaturePad.toDataURL("image/png");
    const base64Data = dataURL.split(",")[1];

    // pega séries selecionadas
    const selectedArr = getSelectedSeries(); // array
    const selectedStr = selectedArr.join(", ");

    // debug
    console.log(
      "Dados da assinatura (base64):",
      base64Data.substring(0, 50) + "...",
    );
    console.log("Séries selecionadas:", selectedArr);

    // monta payload pro EmailJS (certifique-se de ter as variáveis no template)
    const payload = {
      to_email: "sergiooab2015@gmail.com",
      data_assinatura: new Date().toLocaleString("pt-BR"),
      signature_image: base64Data,
      selected_series: selectedStr,
    };

    if (typeof emailjs === "undefined") {
      showMessage("EmailJS não disponível — verifique o CDN.", "error");
      console.error("EmailJS não encontrado.");
      return;
    }

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload)
      .then((response) => {
        console.log("Resposta do servidor:", response);
        showMessage("E-mail enviado com sucesso!", "success");
        // Oculta o campo de assinatura e mostra a mensagem de agradecimento
        document.getElementById("signature-container").style.display = "none";
        document.getElementById("thank-you-message").style.display = "block";
      })
      .catch((error) => {
        console.error("Erro ao enviar e-mail:", error);
        showMessage("Erro ao enviar. Verifique os IDs ou a conexão.", "error");
      });
  });
}

// Função para obter todas as séries selecionadas
function getSelectedSeries() {
  return Array.from(document.querySelectorAll(".series-item.selecionada")).map(
    (el) => el.dataset.series,
  );
}

// Função auxiliar para mostrar mensagens
function showMessage(text, type) {
  const messageEl = document.getElementById("signature-message");
  messageEl.textContent = text;
  messageEl.className = `signature-message ${type}`;
  messageEl.style.display = "block";
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  createStats();
  createModemsList();
  setupSearch();
  initSignaturePad();
});

// Melhorar impressão
window.addEventListener("beforeprint", () => {
  document.querySelectorAll(".model-group").forEach((group) => {
    group.classList.add("show");
  });
  document.querySelectorAll(".series-item").forEach((item) => {
    item.classList.add("show");
  });
});
