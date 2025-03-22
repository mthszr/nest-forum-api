import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from 'src/env'
import { z } from 'zod'

const tokenSchema = z.object({
  sub: z.string().uuid(),
})

type TokenShcema = z.infer<typeof tokenSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

    if (!publicKey) {
      throw new Error('JWT_PUBLIC_KEY is not defined in the configuration')
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  async validate(payload: TokenShcema) {
    return tokenSchema.parse(payload)
  }
}
