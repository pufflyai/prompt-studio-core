# File

Files are how you keep track of text you want to pass to a Language Models. This could be anything from a long document, a story, a research paper, etc. 

Supported formats are `.txt`, `.csv`, `.pdf`, `.md`.

## How can I use a file in an instruction?

To use your file as part of an [instruction](instructions.md), type `/fileName`, and upload your file. 

When you add a file to your instruction, the content of the file is added **in-line** with the rest of your instruction.

Let's go back to the same instruction that we used earlier to extract concerns from a file containing interviews:

```
Based on the following interviews: /interviews, list the concerns expressed by the interviewees.
```

Once you upload your file, the string `/interviews` will be replaced with the actual content of the file. This will make the context available to the LLM in the instruction.


::: warning Should I follow a specific format when adding file content to an instruction?

Adding context to a prompt is something that we are planning to assist you in with our upcoming prompt enhancement features.

:::


::: warning Within a recipe, you need to reference the file every time you want to use it in an instruction

**Within the same recipe**, If you upload a file and use it inside an instruction, the file content is used only inside that instruction. If you want to re-use this file content in another instruction, you need reference the file again by typing e.g `/fileName`.

:::