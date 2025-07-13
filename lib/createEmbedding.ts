import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_API_KEY!);

export async function createEmbedding(text: string) {
  const res = await hf.featureExtraction({
    model: "intfloat/e5-large-v2",
    inputs: text,
  });
  return res;
}
