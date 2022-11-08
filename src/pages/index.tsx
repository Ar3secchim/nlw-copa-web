import Image from 'next/image'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

import imgPreview from  '../assets/app-nlw-preview.png'
import logo from '../assets/logo.svg'
import avatares from '../assets/avatares.png'
import checkIcon from '../assets/icon.svg'

// tipagem TS
interface HomeProps{
  poolCount: number,
  guessesCount: number,
  usersCount: number,
}

export default function Home(props: HomeProps) {
  const [poolTitle , setPoolTilte] = useState('')

  async function createPool (event:FormEvent){
    event.preventDefault()

    try{
      const response = await api.post('pools',{
        title: poolTitle,
      })

      const { Code } = response.data

      await navigator.clipboard.writeText(Code)
      alert('Bolão criado com sucesso, o codigo foi enviado para aréa de transferência!')

      setPoolTilte('')
    }catch (err){
      console.log(err)
      alert('Falha ao criar o bolão, tente novamente')
    }
  }

  return (
    <>
      <main className='flex h-screen max-w-[1124px] mx-auto justify-center items-center '>
        <section className=' text-white-900  max-w-[489px] mx-auto'>

          <Image
            src={logo}
            alt='Logo do NWL Copa'
            quality={100}
          />

          <h1 className='font-bold text-[46px] pb-10 pt-16' >
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>

          <div className='flex items-center pb-10'>
            <Image
              src={avatares}
              alt="Avatares de pessoas"
              quality={100}
            />

            <strong className='font-bold text-xl'>
              <span className='pl-2 pr-1 text-green-500'>
                + {props.usersCount}
              </span>
              pessoas já estão usando
            </strong>
          </div>

          <div>
            <form onSubmit={createPool}>
              <input type='text' required placeholder="Qual é o seu bolão?"
              // status react
              onChange={event => setPoolTilte(event.target.value)}
              value = { poolTitle }
              className='w-72 p-4 bg-gray-500 border rounded-md border-gray-300'/>

              <button className='w-44 bg-yellow-300 text-gray-900 p-4 rounded-md ml-2' type="submit">
                Criar meu Bolão
              </button>
            </form>

            <p className='text-sm pt-4 mb-10'>
              Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
            </p>
          </div>

          <div className=' flex border-t border-gray-300 justify-between' >
            <div className='flex mt-10 border-r border-gray-300 '>
              <Image
                src={checkIcon}
                alt="" quality={100}
                className="mr-6"
              />

              <div className='mr-12'>
                <p  className='text-2xl font-bold'> + {props.poolCount}</p>
                <p className='text-base'>Bolões Criados</p>
              </div>

            </div>

            <div className='flex mt-10 '>
              <Image
                src={checkIcon}
                alt="um icone de check"
                quality={100}
              />

              <div className='ml-6'>
                <p className='text-2xl font-bold'>{ props.guessesCount}</p>
                <p className='text-base'>Palpites enviados</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Image
          src={imgPreview}
          alt="Uma prévia do app de Bolões da NLW Copa em dois smartphones"
          quality={100}
          />
        </section>

      </main>

    </>
  )
}

export const getStaticProps = async ()=>{
  const [poolCountResponse, guessesCountResponse, usersCount] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count')
  ])

  return{
    props:{
      guessesCount : guessesCountResponse.data.count,
      poolCount : poolCountResponse.data.count,
      usersCount : poolCountResponse.data.count,
    },revalidate: 600,
  }
}

