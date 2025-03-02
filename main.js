// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add animation classes to elements as they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".card, .feature-icon, h2, .hero-section"
    );

    elements.forEach((element) => {
      // Get element position relative to viewport
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // If element is in viewport
      if (elementPosition < windowHeight - 100) {
        element.classList.add("fadeIn");
      }
    });
  };

  // Run animation check on page load and scroll
  animateOnScroll();
  window.addEventListener("scroll", animateOnScroll);

  // Toggle mobile navigation menu
  const navbarToggler = document.querySelector(".navbar-toggler");
  if (navbarToggler) {
    navbarToggler.addEventListener("click", () => {
      document.querySelector(".navbar-collapse").classList.toggle("show");
    });
  }

  // Hospital data (simulated database)
  const hospitals = [
    {
      id: 1,
      name: "City General Hospital",
      location: "New York, NY",
      description:
        "A leading medical facility offering comprehensive healthcare services with state-of-the-art equipment.",
      image:
        "https://images.unsplash.com/photo-1578991624414-276ef23a534f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
      doctors: [
        {
          name: "Dr. John Smith",
          specialty: "Cardiology",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          name: "Dr. Sarah Johnson",
          specialty: "Neurology",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          name: "Dr. Michael Brown",
          specialty: "Oncology",
          image: "https://randomuser.me/api/portraits/men/57.jpg",
        },
      ],
      treatments: [
        "Cardiac Surgery",
        "Neurological Care",
        "Cancer Treatment",
        "General Surgery",
        "Orthopedics",
      ],
    },
    {
      id: 2,
      name: "Memorial Health Center",
      location: "Los Angeles, CA",
      description:
        "Specializing in cancer treatment and research with a patient-centered approach to care.",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
      doctors: [
        {
          name: "Dr. Emma Wilson",
          specialty: "Oncology",
          image: "https://randomuser.me/api/portraits/women/22.jpg",
        },
        {
          name: "Dr. Robert Davis",
          specialty: "Radiation Therapy",
          image: "https://randomuser.me/api/portraits/men/41.jpg",
        },
        {
          name: "Dr. Lisa Chen",
          specialty: "Surgical Oncology",
          image: "https://randomuser.me/api/portraits/women/30.jpg",
        },
      ],
      treatments: [
        "Chemotherapy",
        "Radiation Therapy",
        "Immunotherapy",
        "Cancer Surgery",
        "Clinical Trials",
      ],
    },
    {
      id: 3,
      name: "Riverside Medical Center",
      location: "Chicago, IL",
      description:
        "A community hospital known for excellent emergency services and personalized care.",
      image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
      doctors: [
        {
          name: "Dr. James Wilson",
          specialty: "Emergency Medicine",
          image: "https://randomuser.me/api/portraits/men/91.jpg",
        },
        {
          name: "Dr. Patricia Miller",
          specialty: "Family Medicine",
          image: "https://randomuser.me/api/portraits/women/62.jpg",
        },
        {
          name: "Dr. David Clark",
          specialty: "Pediatrics",
          image: "https://randomuser.me/api/portraits/men/39.jpg",
        },
      ],
      treatments: [
        "Emergency Care",
        "Family Medicine",
        "Pediatrics",
        "Obstetrics",
        "Preventive Care",
      ],
    },
  ];

  // Store hospitals in local storage for use across pages
  localStorage.setItem("hospitals", JSON.stringify(hospitals));

  // Function to retrieve URL parameters
  const getUrlParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  // Hospital detail page functionality
  const hospitalDetailContainer = document.getElementById("hospital-detail");
  if (hospitalDetailContainer) {
    const hospitalId = parseInt(getUrlParameter("id"));
    const hospital = hospitals.find((h) => h.id === hospitalId);

    if (hospital) {
      displayHospitalDetail(hospital, hospitalDetailContainer);
    } else {
      hospitalDetailContainer.innerHTML =
        '<div class="alert alert-danger">Hospital not found</div>';
    }
  }

  // Function to display hospital detail
  function displayHospitalDetail(hospital, container) {
    const detailHTML = `
        <div class="row">
          <div class="col-lg-8 mb-4">
            <img src="${hospital.image}" alt="${
      hospital.name
    }" class="img-fluid rounded shadow">
          </div>
          <div class="col-lg-4">
            <h1>${hospital.name}</h1>
            <p class="text-muted mb-3">${hospital.location}</p>
            <p>${hospital.description}</p>
          </div>
        </div>
        
        <div class="row mt-5">
          <div class="col-12">
            <h2 class="mb-4">Our Doctors</h2>
            <div class="row g-4">
              ${hospital.doctors
                .map(
                  (doctor) => `
                <div class="col-md-4">
                  <div class="card h-100 border-0 shadow-sm">
                    <img src="${doctor.image}" class="card-img-top" alt="${doctor.name}">
                    <div class="card-body">
                      <h3 class="h5 card-title">${doctor.name}</h3>
                      <p class="card-text"><small class="text-muted">${doctor.specialty}</small></p>
                      <a href="#" class="btn btn-sm btn-outline-primary mt-2">Book Appointment</a>
                    </div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
        
        <div class="row mt-5">
          <div class="col-12">
            <h2 class="mb-4">Available Treatments</h2>
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  ${hospital.treatments
                    .map(
                      (treatment) => `
                    <li class="list-group-item border-0 py-3">
                      <div class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#34A853" class="bi bi-check-circle-fill me-3" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                        ${treatment}
                      </div>
                    </li>
                  `
                    )
                    .join("")}
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;

    container.innerHTML = detailHTML;
  }
});
