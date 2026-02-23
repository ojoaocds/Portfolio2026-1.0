import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

let resendClient: Resend | null = null;

function getResend() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not defined in environment variables.");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, instagram, projectType, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    try {
      const resend = getResend();
      // Send email
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || "Portfolio <onboarding@resend.dev>",
        to: [process.env.EMAIL_TO || "joaopedrocardosods@gmail.com"],
        subject: `Novo Projeto: ${projectType} - ${name}`,
        html: `
          <h1>Novo contato do Portfolio</h1>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>WhatsApp:</strong> ${phone}</p>
          <p><strong>Instagram:</strong> ${instagram || 'Não informado'}</p>
          <p><strong>Tipo de Projeto:</strong> ${projectType}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${message}</p>
        `,
      });

      if (error) {
        console.error("Erro ao enviar e-mail:", error);
        return res.status(500).json({ error: "Erro ao enviar mensagem." });
      }

      res.json({ success: true, data });
    } catch (err) {
      console.error("Erro no servidor:", err);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
