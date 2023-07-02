"use client"

import React, { useState } from "react"
import { generatePrompt } from "@/utils/generate-prompt"
import { generateRecipe } from "@/utils/generate-recipe"

import { GeneratedRecipeContent } from "@/components/generated-recipe-content"
import { RecipeForm } from "@/components/recipe-form"

export function GenerateRecipe() {
  const [generatedRecipe, setGeneratedRecipe] = useState<string>("")

  const onSubmit = async (values: any, e: React.FormEvent) => {
    e.preventDefault()
    setGeneratedRecipe("")
    const prompt = generatePrompt(values)
    const response = await generateRecipe(prompt)

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      const formattedChunk = chunkValue.replace(/\n/g, "<br>")
      setGeneratedRecipe((prev) => prev + formattedChunk)
    }
  }

  return (
    <div>
      <RecipeForm onSubmit={onSubmit} />
      <hr className="border-1 h-px bg-gray-700 dark:bg-gray-700" />
      <div className="my-auto space-y-10">
        {generatedRecipe && <GeneratedRecipeContent recipe={generatedRecipe} />}
      </div>
    </div>
  )
}
