import { Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

/*const createAccountBodyShcema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})*/

//type CreateAccountBodySchema = z.infer<typeof createAccountBodyShcema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  //@HttpCode(201)
  //@UsePipes(new ZodValidationPipe(createAccountBodyShcema))
  async handle() {
    const token = this.jwt.sign({ sub: 'user-id' })

    return token
  }
}
