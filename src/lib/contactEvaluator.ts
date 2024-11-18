type EvalutationResult = { isValid: false, message: string } | { isValid: true }

export interface ContactTypeEvalutator {
  evaluate: (value: string) => EvalutationResult
}

export const TiktokAccountEvaluator: ContactTypeEvalutator = {
  evaluate(value) {
    const usernameRegex = /^[a-zA-Z0-9_.]+$/;

    if (!usernameRegex.test(value))
      return {
        isValid: false,
        message: 'El nombre de usuario debe contener solo letras, números, puntos y guiones bajos'
      }


    if (value.length > 24)
      return {
        isValid: false,
        message: 'El nombre de usuario no puede tener más de 24 caracteres'
      }


    if (value.length < 5)
      return {
        isValid: false,
        message: 'El nombre de usuario debe tener al menos 5 caracteres'
      }



    return { isValid: true }
  }
}

export const InstagramAccountEvaluator: ContactTypeEvalutator = {

  evaluate(value) {

    const usernameRegex = /^[a-zA-Z0-9.]+$/;

    if (!usernameRegex.test(value))
      return {
        isValid: false,
        message: 'El nombre de usuario debe contener solo letras, números y puntos'
      }

    if (value.length > 30)
      return {
        isValid: false,
        message: 'El nombre de usuario no puede tener mas de 30 caracteres'
      }
    if (value.length < 5)
      return {
        isValid: false,
        message: 'El nombre de usuario debe tener al menos 5 caracteres'
      }

    return { isValid: true }
  },
}


export const FacebookAccountEvaluator: ContactTypeEvalutator = {
  evaluate(value) {
    const usernameRegex = /^(?!.*\.(com|net|org|gov|edu|io|uk|ca|de|ie|[a-z]{2})$)[a-zA-Z0-9.]+$/;

    if (!usernameRegex.test(value)) return { isValid: false, message: 'El nombre de usuario solo puede contener caracteres alfanuméricos y puntos.' }

    if (value.length < 5) return { isValid: false, message: 'El nombre de usuario debe contener al menos 5 caracteres.' }

    if (value.length > 50) return { isValid: false, message: 'El nombre de usuario no puede tener más de 50 caracteres.' }

    return { isValid: true }
  },
}

export const PhoneNumberEvaluator: ContactTypeEvalutator = {
  evaluate(value) {
    const phoneNumberRegex = /^(\d{3}[-\s]?){2}\d{4}$/;

    if (!phoneNumberRegex.test(value)) return { isValid: false, message: 'El número de teléfono debe ser válido' }

    if (value.length != 10) return { isValid: false, message: 'El número de teléfono debe tener 10 dígitos' }

    return { isValid: true }
  }
}

export const EmailEvaluator: ContactTypeEvalutator = {
  evaluate(value) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(value)) return { isValid: false, message: 'El email debe ser válido' }

    return { isValid: true }
  }
}


export const contactEvaluatorResolver = (value: string) => {
  switch (value) {
    case 'facebook': return FacebookAccountEvaluator
    case 'instagram': return InstagramAccountEvaluator
    case 'messenger': return FacebookAccountEvaluator
    case 'telefono': return PhoneNumberEvaluator
    case 'teléfono': return PhoneNumberEvaluator
    case 'whatsapp': return PhoneNumberEvaluator
    case 'correo': return EmailEvaluator
    default: {
      return {
        evaluate: () => {
          return { isValid: true }
        }
      } as ContactTypeEvalutator
    }
  }
}