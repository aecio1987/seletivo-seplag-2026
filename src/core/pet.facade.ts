import { BehaviorSubject } from "rxjs"

/* =======================
   TYPES (exportados)
======================= */
export type Pet = {
  id?: string
  codigo?: string
  nome: string
  especie: string
  raca: string
  foto?: string
  idadeAnos?: number
  idadeMeses?: number
  emoji?: string
  email?: string
}

export type Tutor = {
  tutor: string
  email: string
  cpf: string
  telefone: string
  cep: string
  endereco: string
  numero: string
  complemento?: string
  estado: string
  cidade: string
  foto?: string
  senha?: string
}

/* =======================
   STORAGE KEYS
======================= */
const PETS_KEY = "@pet-app:db-pets"
const TUTORS_KEY = "@pet-app:db-tutors"
const USER_KEY = "@pet-app:session-user"
const EMAIL_KEY = "@pet-app:session-email"

/* =======================
   HELPERS
======================= */
function loadPets(): Pet[] {
  return JSON.parse(localStorage.getItem(PETS_KEY) || "[]")
}

function savePets(pets: Pet[]) {
  localStorage.setItem(PETS_KEY, JSON.stringify(pets))
}

function loadTutors(): Tutor[] {
  return JSON.parse(localStorage.getItem(TUTORS_KEY) || "[]")
}

function saveTutors(tutors: Tutor[]) {
  localStorage.setItem(TUTORS_KEY, JSON.stringify(tutors))
}

/* =======================
   SUBJECTS
======================= */
const currentUserSubject = new BehaviorSubject<string | null>(
  localStorage.getItem(USER_KEY)
)

const petsSubject = new BehaviorSubject<Pet[]>([])

/* =======================
   FACADE
======================= */
export const PetFacade = {
  pets$: petsSubject.asObservable(),
  user$: currentUserSubject.asObservable(),

  init() {
    this.initList()
  },

  /* ===== TUTOR ===== */
  getTutorData(): Tutor | null {
    const email = localStorage.getItem(EMAIL_KEY)
    if (!email) return null
    return loadTutors().find(t => t.email === email) || null
  },

  register(tutorData: Tutor): boolean {
    const tutors = loadTutors()
    if (tutors.find(t => t.email === tutorData.email)) return false

    tutors.push(tutorData)
    saveTutors(tutors)
    return true
  },

  login(email: string, senha: string): boolean {
    const tutors = loadTutors()
    const user = tutors.find(
      t => t.email === email && t.senha === senha
    )
    if (!user) return false

    localStorage.setItem(USER_KEY, user.tutor.split(" ")[0])
    localStorage.setItem(EMAIL_KEY, email)

    currentUserSubject.next(user.tutor)
    this.initList()
    return true
  },

  logout() {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(EMAIL_KEY)
    currentUserSubject.next(null)
    petsSubject.next([])
  },

  updateTutor(data: Partial<Tutor>) {
    const email = localStorage.getItem(EMAIL_KEY)
    if (!email) return

    const tutors = loadTutors().map(t =>
      t.email === email ? { ...t, ...data } : t
    )

    saveTutors(tutors)
  },

  updatePassword(senhaAtual: string, novaSenha: string): boolean {
    const email = localStorage.getItem(EMAIL_KEY)
    if (!email) return false

    const tutors = loadTutors()
    const tutor = tutors.find(t => t.email === email)

    if (!tutor || tutor.senha !== senhaAtual) return false

    tutor.senha = novaSenha
    saveTutors(tutors)
    return true
  },

  /* ===== PETS ===== */
  addPet(pet: Omit<Pet, "id" | "codigo">) {
    const email = localStorage.getItem(EMAIL_KEY)
    if (!email) return

    const pets = loadPets()
    pets.push({
      ...pet,
      email,
      id: Date.now().toString(),
      codigo: `#${(pets.length + 1)
        .toString()
        .padStart(6, "0")}`,
    })

    savePets(pets)
    this.initList()
  },

  updatePet(id: string, data: Partial<Pet>) {
    savePets(
      loadPets().map(p =>
        p.id === id ? { ...p, ...data } : p
      )
    )
    this.initList()
  },

  deletePet(id: string) {
    savePets(loadPets().filter(p => p.id !== id))
    this.initList()
  },

  initList() {
    const email = localStorage.getItem(EMAIL_KEY)
    if (!email) {
      petsSubject.next([])
      return
    }

    petsSubject.next(
      loadPets().filter(p => p.email === email)
    )
  },
}
