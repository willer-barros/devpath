"use server"

// Volte para o import oficial
import { PrismaClient } from "@prisma/client" 
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

// Instancie de forma simples
const prisma = new PrismaClient()

export async function registerUser(formData) {
  const name = formData.get("name")
  const email = formData.get("email")
  const password = formData.get("password")

  if (!name || !email || !password) {
    throw new Error("Preencha todos os campos")
  }

  // Criptografando a senha antes de salvar
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
    return { error: "Erro ao salvar no banco de dados." }
  }

  redirect("/login")
}