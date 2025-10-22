// Configurações do EmailJS
const EMAILJS_SERVICE_ID = "service_xv2t1ao";
const EMAILJS_TEMPLATE_ID = "template_gip2me9";
const EMAILJS_USER_ID = "9dD831WDZMpRIqpY2";

// Inicializa EmailJS
emailjs.init(EMAILJS_USER_ID);

// Dados dos modems
const modemsData = {
  SAGEMCOM: [
    "SMBS000F671F",
    "SMBS0007192E",
    "SMBS000FFBCD",
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
    "SMBS04008E92",
    "SMBS00537E94",
    "SMBS00537BF9",
    "SMBS004185AE",
    "SMBS00537DD3",
    "SMBS003E9A48",
    "SMBS00322DFE",
  ],
  KAON: [
    "KON09012EDD",
    "KON0901AA7D",
    "KON0901DE86",
    "KON090104EF",
    "KON0901D010",
    "KON0901A132",
    "KON0901C678",
    "KON0900410D",
    "KON09020FAE",
    "KON0900ED1C",
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
  ],
  ZTE: [
    "ZTEGCB314EC8",
    "ZTEGCB311F69",
    "ZTEGCE07C076",
    "ZTEGCB31508E",
    "ZTEGCE089ED7",
    "ZTEGCE07BFDF",
    "ZTEGD4F1BE11",
  ],
  TECHNICOLOR: [
    "TMBB0056758E",
    "TMBB0056F1C2",
    "TMBB0053F77E",
    "TMBB0055C847",
    "TMBB0056F522",
    "TMBB00565747",
  ],
  "BLU-CASTLE": [
    "FTTH098EB0C0",
    "FTTH0A11BD78",
    "FTTH0B27F7F0",
    "FTTH08923580",
    "FTTH0A22DA00",
    "BCSK4896A08C",
  ],
};

const statsData = {
  SAGEMCOM: 27,
  KAON: 10,
  FIBERHOME: 8,
  ZTE: 7,
  TECHNICOLOR: 6,
  "BLU-CASTLE": 6,
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
          `.model-group[data-model="${item.dataset.model}"]`
        );
        if (modelSection) {
          modelSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
}

// Função para criar lista de modems
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
      html += `<li class="series-item" data-series="${seriesId}">${seriesId}</li>`;
    });

    html += "</ul></div>";
  });

  container.innerHTML = html;

  document.querySelectorAll(".model-group").forEach((group) => {
    group.classList.add("show");
  });
  document.querySelectorAll(".series-item").forEach((item) => {
    item.classList.add("show");
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
  const signaturePad = new SignaturePad(canvas, {
    backgroundColor: "rgb(255, 255, 255)",
    penColor: "rgb(0, 0, 0)",
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
    console.log(
      "Dados da assinatura (base64):",
      base64Data.substring(0, 50) + "..."
    );

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: "sergiooab2015@gmail.com",
        data_assinatura: new Date().toLocaleString("pt-BR"),
        signature_image: base64Data,
      })
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

// Função auxiliar para mostrar mensagens
function showMessage(text, type) {
  const messageEl = document.getElementById("signature-message");
  messageEl.textContent = text;
  messageEl.className = `signature-message ${type}`;
  messageEl.style.display = "block"; // Mantém a mensagem visível
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
