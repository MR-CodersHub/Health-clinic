const servicesData = {
    "cardiology": {
        title: "Cardiology Department",
        subtitle: "Comprehensive heart care provided by world-class specialists.",
        image: "assets/images/cardiology.jpg",
        overview: "Our Cardiology department offers a full spectrum of diagnostic and therapeutic services for patients with heart conditions. From preventive screenings to complex interventional procedures, our expert team is dedicated to heart health. We utilize the latest technology in echocardiography, stress testing, and cardiac catheterization to ensure accurate diagnosis and effective treatment plans tailored to each patient.",
        conditions: ["Coronary Artery Disease", "Heart Failure", "Arrhythmia", "Hypertension"],
        process: [
            { title: "Initial Consultation", desc: "Comprehensive review of your medical history and current symptoms." },
            { title: "Diagnostic Testing", desc: "Advanced imaging and tests to pinpoint the exact issue." },
            { title: "Personalized Plan", desc: "Developing a treatment strategy that fits your lifestyle and needs." }
        ],
        price: "$150"
    },
    "dental": {
        title: "Dental Care Department",
        subtitle: "Comprehensive dental services from routine checkups to cosmetic modifications.",
        image: "assets/images/dental.jpg",
        overview: "Our Dental Care team is dedicated to giving you the perfect smile. We offer everything from routine cleanings and cavity fillings to advanced cosmetic procedures and oral surgery. Our clinic is equipped with modern dental technology to ensure a pain-free and comfortable experience for patients of all ages.",
        conditions: ["Cavities & Tooth Decay", "Gum Disease", "Tooth Loss", "Malocclusion"],
        process: [
            { title: "Oral Examination", desc: "Thorough checkup of teeth and gums including X-rays if needed." },
            { title: "Hygiene & Treatment", desc: "Professional cleaning or specific treatments for identified issues." },
            { title: "Preventive Care", desc: "Guidance on maintaining oral hygiene to prevent future problems." }
        ],
        price: "$80"
    },
    "neurology": {
        title: "Neurology Department",
        subtitle: "Specialized care for disorders of the nervous system, brain, and spine.",
        image: "assets/images/neurology.jpg",
        overview: "Our Neurology department provides expert care for patients with diseases of the brain, spinal cord, peripheral nerves, and muscles. We treat a wide range of neurological conditions using the latest diagnostic tools and therapeutic interventions, ensuring the best possible quality of life for our patients.",
        conditions: ["Migraines & Headaches", "Epilepsy & Seizures", "Stroke Recovery", "Peripheral Neuropathy"],
        process: [
            { title: "Neurological Exam", desc: "Assessment of sensory and motor functions, reflexes, and coordination." },
            { title: "Advanced Imaging", desc: "MRI or CT scans to visualize brain and spinal structures." },
            { title: "Therapeutic Management", desc: "Medication management and rehabilitation therapies." }
        ],
        price: "$200"
    },
    "pediatrics": {
        title: "Pediatrics Department",
        subtitle: "Dedicated healthcare for infants, children, and adolescents.",
        image: "assets/images/pediatrics.jpg",
        overview: "We understand that children need special care. Our Pediatrics department offers a warm, friendly environment where we treat everything from common childhood illnesses to complex developmental issues. Our goal is to ensure your child grows up healthy and strong.",
        conditions: ["Common Infections", "Growth & Development", "Asthma & Allergies", "Childhood Immunizations"],
        process: [
            { title: "Child-Friendly Checkup", desc: "Gentle examination in a comforting environment." },
            { title: "Developmental Screening", desc: "Monitoring growth milestones and physical health." },
            { title: "Parent Consultation", desc: "Discussing diet, health habits, and vaccination schedules." }
        ],
        price: "$100"
    },
    "ophthalmology": {
        title: "Ophthalmology Department",
        subtitle: "Eye care services to maintain vision health and treat eye diseases.",
        image: "assets/images/ophthalmology.jpg",
        overview: "Your vision is precious. Our Ophthalmology department offers comprehensive eye exams, vision correction, and treatment for eye diseases. Whether you need a simple prescription update or complex eye surgery, our specialists are here to help you see the world clearly.",
        conditions: ["Cataracts", "Glaucoma", "Refractive Errors", "Macular Degeneration"],
        process: [
            { title: "Vision Assessment", desc: "Testing visual acuity and prescription needs." },
            { title: "Eye Health Exam", desc: "Checking for signs of diseases like glaucoma or cataracts." },
            { title: "Treatment/Correction", desc: "Prescribing glasses, medication, or scheduling surgery." }
        ],
        price: "$120"
    },
    "orthopedics": {
        title: "Orthopedics Department",
        subtitle: "Treatment for musculoskeletal issues including bones, joints, and muscles.",
        image: "assets/images/orthopedics.jpg",
        overview: "Don't let pain hold you back. Our Orthopedics department specializes in the diagnosis and treatment of bone, joint, ligament, and muscle disorders. From sports injuries to arthritis management and joint replacement, we help you regain mobility and live pain-free.",
        conditions: ["Arthritis & Joint Pain", "Fractures & Trauma", "Sports Injuries", "Back & Neck Pain"],
        process: [
            { title: "Physical Evaluation", desc: "Assessing range of motion, pain points, and stability." },
            { title: "Imaging & Diagnosis", desc: "Using X-rays or MRI to visualize internal structures." },
            { title: "Rehabilitation plan", desc: "Physical therapy, medication, or surgical intervention plan." }
        ],
        price: "$180"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id') || 'cardiology'; // Default to cardiology
    const service = servicesData[serviceId] || servicesData['cardiology'];

    // Update Meta Title
    document.title = `${service.title} - MediCare`;

    // Update Header
    document.getElementById('service-title').textContent = service.title;
    document.getElementById('service-subtitle').textContent = service.subtitle;

    // Update Main Image
    const imgEl = document.getElementById('service-image');
    if (imgEl) imgEl.src = service.image;

    // Update Overview
    document.getElementById('service-overview').textContent = service.overview;

    // Update Conditions
    const conditionsContainer = document.getElementById('service-conditions');
    if (conditionsContainer) {
        conditionsContainer.innerHTML = service.conditions.map(condition => `
            <div class="flex items-center gap-3 bg-neutral-light p-4 rounded-xl">
                <div class="w-2 h-2 bg-medical rounded-full"></div>
                <span class="font-medium text-gray-700">${condition}</span>
            </div>
        `).join('');
    }

    // Update Process
    const processContainer = document.getElementById('service-process');
    if (processContainer) {
        processContainer.innerHTML = service.process.map((step, index) => `
            <div class="flex gap-4">
                <div class="w-10 h-10 bg-medical text-white rounded-full flex items-center justify-center font-bold shrink-0">
                    ${index + 1}
                </div>
                <div>
                    <h4 class="font-bold text-lg text-gray-900">${step.title}</h4>
                    <p class="text-gray-600">${step.desc}</p>
                </div>
            </div>
        `).join('');
    }

    // Update Price
    const priceEl = document.getElementById('service-price');
    if (priceEl) priceEl.textContent = service.price;
});
