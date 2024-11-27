const steps = document.querySelectorAll('.form-step');
const progress = document.getElementById('progress');
const stepIndicators = document.querySelectorAll('.progress-bar .step');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

let currentStep = 0;

function showStep(index) {
  // Update active class for steps
  steps.forEach((step, idx) => {
    step.classList.toggle('active', idx === index);
  });

  // Update progress bar
  stepIndicators.forEach((indicator, idx) => {
    indicator.classList.toggle('active', idx === index);
    indicator.classList.toggle('completed', idx < index);
  });

  progress.style.width = ((index) / (steps.length - 1)) * 100 + '%';

  // Manage button visibility
  prevBtn.classList.toggle('hidden', index === 0);
  nextBtn.classList.toggle('hidden', index === steps.length - 1);
  submitBtn.classList.toggle('hidden', index !== steps.length - 1);
}

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

nextBtn.addEventListener('click', () => {
  if (validateStep(currentStep)) {
    currentStep++;
    showStep(currentStep);
  }
});

function validateStep(index) {
  const inputs = steps[index].querySelectorAll('input, select');
  for (const input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      return false;
    }
  }
  return true;
}

document.getElementById('kycForm').addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Form submitted successfully!');
});

// Initialize
showStep(currentStep);
