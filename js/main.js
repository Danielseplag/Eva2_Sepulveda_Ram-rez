const navbar = document.getElementById("mainNavbar");
const contrastBtn = document.getElementById("contrastBtn");
const quickButtons = document.querySelectorAll(".quick-card");
const quickResult = document.getElementById("quickResult");

const serviceCards = document.querySelectorAll(".service-card");
const serviceDetail = document.getElementById("serviceDetail");

const loadNewsBtn = document.getElementById("loadNewsBtn");
const newsContainer = document.getElementById("newsContainer");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formResult = document.getElementById("formResult");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

contrastBtn.addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
});

quickButtons.forEach((button) => {
    button.addEventListener("click", () => {
        quickResult.innerHTML = `
      <div class="alert alert-warning mb-0">
        Acceso seleccionado: <strong>${button.textContent}</strong>.
      </div>
    `;
    });
});

serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
        const serviceName = card.dataset.service;

        serviceDetail.classList.remove("d-none");
        serviceDetail.textContent = `Has seleccionado: ${serviceName}. Esta sección entrega información útil para orientar a la comunidad.`;
    });

    card.addEventListener("mouseover", () => {
        card.classList.add("border-primary");
    });

    card.addEventListener("mouseleave", () => {
        card.classList.remove("border-primary");
    });
});

loadNewsBtn.addEventListener("click", () => {
    const newArticle = document.createElement("div");
    newArticle.className = "col-md-4";
    newArticle.innerHTML = `
    <div class="card municipal-card h-100">
      <div class="card-body">
        <h5 class="card-title">Participación ciudadana</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">Comunidad</h6>
        <p class="card-text">La comunidad puede participar en encuestas, actividades y procesos comunales.</p>
        <a href="#contacto" class="card-link">Participar</a>
      </div>
    </div>
  `;

    newsContainer.appendChild(newArticle);
    loadNewsBtn.textContent = "Noticia agregada";
    loadNewsBtn.disabled = true;
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = searchInput.value.trim();

    if (value === "") {
        alert("Ingresa un término de búsqueda.");
        return;
    }

    alert(`Búsqueda simulada: ${value}`);
    searchInput.value = "";
});

function validateName() {
    const value = nameInput.value.trim();
    const feedback = nameInput.nextElementSibling;

    if (value.length < 3) {
        setInvalid(nameInput, feedback, "El nombre debe tener al menos 3 caracteres.");
        return false;
    }

    setValid(nameInput, feedback, "Nombre válido.");
    return true;
}

function validateEmail() {
    const value = emailInput.value.trim();
    const feedback = emailInput.nextElementSibling;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
        setInvalid(emailInput, feedback, "Ingresa un correo electrónico válido.");
        return false;
    }

    setValid(emailInput, feedback, "Correo válido.");
    return true;
}

function validateMessage() {
    const value = messageInput.value.trim();
    const feedback = messageInput.nextElementSibling;

    if (value.length < 10) {
        setInvalid(messageInput, feedback, "El mensaje debe tener al menos 10 caracteres.");
        return false;
    }

    setValid(messageInput, feedback, "Mensaje válido.");
    return true;
}

function setInvalid(input, feedback, message) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    feedback.textContent = message;
    feedback.className = "feedback error";
}

function setValid(input, feedback, message) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    feedback.textContent = message;
    feedback.className = "feedback success";
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
messageInput.addEventListener("input", validateMessage);

form.addEventListener("submit", (event) => {
    event.preventDefault();

        const formData = {
        nombre: nameInput.value.trim(),
        correo: emailInput.value.trim(),
        mensaje: messageInput.value.trim(),
    };

    console.log("Datos del formulario:", formData);

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
        formResult.innerHTML = `
    <div class="alert alert-success">
        Solicitud enviada correctamente. Gracias por contactar a la Municipalidad de Cholchol.
    </div>
    `;

        form.reset();

        [nameInput, emailInput, messageInput].forEach((input) => {
            input.classList.remove("is-valid");
        });
    } else {
        formResult.innerHTML = `
    <div class="alert alert-danger">
        Revisa los campos marcados antes de enviar el formulario.
    </div>
    `;
    }
});