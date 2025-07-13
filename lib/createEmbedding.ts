import { HfInference } from "@huggingface/inference";

export interface EmbeddingsInterface {
  embedQuery(text: string): Promise<number[]>;
  embedDocuments(texts: string[]): Promise<number[][]>;
}

export class HuggingFaceEmbeddings implements EmbeddingsInterface {
  private hf: HfInference;
  private modelName: string;

  constructor(apiKey: string, modelName = "intfloat/e5-large-v2") {
    this.hf = new HfInference(apiKey);
    this.modelName = modelName;
  }

  async embedQuery(text: string): Promise<number[]> {
    const embedding = await this.hf.featureExtraction({
      model: this.modelName,
      inputs: text,
    });
    if (Array.isArray(embedding) && Array.isArray(embedding[0])) {
        // If returned as array of arrays, pick first
        return embedding[0] as number[];
      } else if (Array.isArray(embedding)) {
        return embedding as number[];
      } else {
        throw new Error("Unexpected embedding output format");
      }
    }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    const embeddings = await Promise.all(texts.map((t) => this.embedQuery(t)));
    return embeddings;
  }
}
