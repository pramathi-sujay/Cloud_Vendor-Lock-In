# 🚀 SkyPort: The Zero-Lock-In Cloud Platform


**SkyPort** is a production-grade, vendor-neutral cloud control plane designed to eliminate the friction of multi-cloud orchestration. It abstracts away the complexity of specific cloud providers, allowing developers to deploy, monitor, and migrate workloads across AWS, Google Cloud (GCP), and Azure through a single, unified interface.

---

## ✨ Key Features

### 🌍 Unified Multi-Cloud Dashboard
Manage your entire global infrastructure from one pane of glass. Monitor health, active deployments, and real-time SLAs across all providers.

### 🚀 Direct Deployment Engine
Deploy containerized applications instantly. Simply provide your Docker image, select your provider (AWS, GCP, or Azure), and SkyPort handles the provider-specific orchestration logic automatically.

### 🔄 Zero-Downtime Migration
Our **Migration Engine** automates the transition of services between cloud providers. It analyzes your current configuration, maps dependencies, and executes the transfer with minimal manual intervention.

### 📊 Real-Time Observability
Datadog-grade observability with live status pulses, uptime tracking, and centralized logs for deep-tissue health checks of your multi-cloud fleet.

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js**: Modular component architecture.
- **Tailwind CSS**: Modern, responsive design system.
- **Framer Motion**: Smooth, high-performance animations and transitions.
- **Lucide React**: Clean, consistent iconography.
- **Axios**: Robust API communication.

### **Backend**
- **Node.js & Express**: High-performance, scalable API layer.
- **Mongoose / MongoDB**: Metadata storage for deployment states and configurations.
- **Provider Abstraction Layer**: Custom adapters for AWS and GCP to normalize cloud operations.

### **Infrastructure**
- **Docker**: Containerized services for easy deployment and portability.

---

## 🚀 Getting Started

To get started with SkyPort locally, follow these steps:

### **1. Clone the Repository**
```bash
git clone https://github.com/pramathi-sujay/Cloud_Vendor-Lock-In.git
cd Cloud_Vendor-Lock-In
```

### **2. Setup the Backend**
```bash
cd cloud-abstraction-platform/backend
npm install
# Create a .env file and add your MongoDB URI and Provider credentials
npm run dev
```

### **3. Setup the Frontend**
```bash
cd ../frontend
npm install
npm start
```

---

## 📂 Project Structure

```bash
├── cloud-abstraction-platform
│   ├── backend          # Express API & Cloud Abstraction Layer
│   │   ├── services/    # AWS & GCP Adapters
│   │   ├── routes/      # Deployment & Status Endpoints
│   │   └── data/        # Mock Local Store & Database Logic
│   └── frontend         # React Application & UI Components
│       ├── components/  # Reusable Dashboard Elements
│       ├── pages/       # Home, Deploy, Migration Views
│       └── assets/      # Styles & Visual Assets
└── README.md
```

---

## 🤝 Contributing

We welcome contributions! Whether it's adding support for a new cloud provider (Azure, DigitalOcean) or improving our migration algorithms, please feel free to open a PR.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
