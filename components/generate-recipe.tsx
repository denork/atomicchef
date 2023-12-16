"use client"

import React, { useState } from "react"

import { defaultValues, type FormData } from "@/types/types"
import { generatePrompt } from "@/lib/generate-prompt"
import { generateRecipe } from "@/lib/generate-recipe"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"
import { RecipeForm } from "@/components/form/generate-recipe-form"
import { GeneratedRecipeContent } from "@/components/generated-recipe-content"
import { Icons } from "@/components/icons"

export function GenerateRecipe() {
  const [generatedRecipe, setGeneratedRecipe] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [recipeVisible, setRecipeVisible] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<FormData>(defaultValues)

  const onSubmit = async (values: FormData, e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setGeneratedRecipe("")

    const prompt = generatePrompt(values)
    const response = await generateRecipe(prompt)
    setFormValues(values)

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
      setRecipeVisible(true)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl">
      <div
        className={cn("mx-auto w-full space-x-2", {
          "md:flex": loading || recipeVisible,
          "max-w-2xl": !loading && !recipeVisible,
        })}
      >
        <div
          className={cn("w-full justify-around", {
            "md:flex md:w-1/3": loading || recipeVisible,
            "": !loading && !recipeVisible,
          })}
        >
          <RecipeForm onSubmit={onSubmit} isLoading={loading} />
        </div>
        <div
          className={cn({
            "rounded-xl border md:flex md:w-2/3": loading || recipeVisible,
            "": !loading && !recipeVisible,
          })}
        >
          <div className="my-2 md:flex md:flex-row-reverse">
            {generatedRecipe && (
              <>
                <div className="flex justify-end px-4">
                </div>
                <GeneratedRecipeContent recipe={generatedRecipe} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
