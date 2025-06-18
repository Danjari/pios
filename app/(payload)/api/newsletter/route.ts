import { LoopsClient } from "loops"

const loops = new LoopsClient(process.env.LOOPS_API_KEY as string)

export async function POST(request: Request) {
  try {
    const res = await request.json()

    const { email, number, firstName } = res

    console.log(email)
    if (!email|| !number || !firstName) {
      return Response.json({ success: false, message: "Missing required fields" })
    }



    const existing = await loops.findContact({ email })
    if (existing.length !== 0) {
      return Response.json({ message: "User already exists" })
    }

    const resp = await loops.updateContact(email,{firstName, number})

    return Response.json({ success: resp.success })
  } catch (error) {
    console.error("Error submitting to Loops:", error)
    return Response.json({ success: false })
  }
}
