import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../templates/Footer'
export default class Termos extends React.Component{


    render() {
        

        return (
            <div
                style={{
                    background: "linear-gradient(to right, rgb(22, 34, 42), rgb(58, 96, 115))"
                }}
                className='m-2'
            >
                 <Link to='/Register' > 
                         
                         <button type="button" style={{borderRadius:'8px'}} class=" m-1 btn btn-warning"> <i class="fa fa-arrow-left " aria-hidden="true" size={16} color='#E02041'> <span className='text-decoration-none'> Voltar</span> </i></button>
                          
                         </Link>
                <h1
                    style={{
                        color:"white"
                    }}
                    className='text-center font-weight-bold'
                >Termos de uso</h1>

                <ol
                    style={{
                    color:"white"
                }}
                >
                    <li>
                        <p
                        className="ml-2"
                        >Um serviço é um produto da atividade humana que satisfaz a uma necessidade, sem assumir a forma de um bem material. Não aceitamos publicações de serviços que ferem os direitos humanos ou que represente qualquer forma de violência, sendo, caso publicados, excluídos da plataforma, resultando no banimento do usuário no sistema.
</p>
                    </li>

                    <li>
                        <p
                        className="ml-2"
                        >A empresa não se responsabiliza por qualquer dano ou prejuízo com envio de informações ou de conteúdo publicitário que não tenham sido disparados por nós, sejam esses últimos legítimos ou indesejados (Spam), e também não nos responsabilizamos pela criação de serviços com nomes/descrições ou conteúdos inapropriados (com caráter ilícito ou malicioso), no entanto, estes e os usuários envolvidos serão removidos assim que forem detectados pela empresa.
</p>
                    </li>

                    <li>
                        <p
                        className="ml-2"
                        >Todas imagens/vídeos presentes no site bem como o nome da empresa são de propriedade da empresa, não devendo ser utilizadas por terceiros.
</p>
                    </li>

                    <li>
                        <p
                        className="ml-2"
                        >A plataforma visa conectar os usuários que precisam que um serviço seja realizado aos que procuram um serviço para realizar. A fim deste objetivo, o serviço é criado na aba Serviços>Meus serviços pelo primeiro usuário, enquanto que o segundo pode visualizar os serviços criados pelos outros usuarios na página inicial ou na página “Todos serviços”. Estes apresentarão uma opção “ver mais” e nela serão informados os detalhes do serviço por parte de quem o criou. O usuário que quiser realizá-lo deverá informar sua intenção em “Desejo realizar o serviço”. Quem  criou o serviço irá ver essa intenção na página “Meus serviços”, no botão “ Ver interessados”, onde poderá aceitar ou recusar qualquer usuário interessado. 
</p>
                    </li>

                    <li>
                        <p
                        className="ml-2"
                        >Após criar um serviço, que deve ter um valor mínimo de 5R$, deverá ser pago um boleto no valor dele com as taxas, que somam 1.49 R$. Esta taxa, bem como os Termos de uso, poderão ser modificados pela empresa sem ser necessário avisar aos usuários. O reembolso do boleto poderá ser solicitado após 3 dias da criação do serviço e  deverá ser solicitado através do email da empresa (seuservico.suporte@gmail.com). 
 
</p>
                    </li>

                    <li>
                        <p
                        className="ml-2"
                        >Nosso objetivo é oferecer um meio de conexão entre os usuários que precisam que um serviço seja realizado aos que procuram um serviço para realizar. Portanto, não nos responsabilizamos pela qualidade prestada do serviço por parte do usuário que irá realizá-lo e nem por danos causados pelo mesmo.

 
</p>
                    </li>

                    <li>
                        <p
                        className="ml-2"
                        >
                        Todas as informações dos usuários serão armazenadas no nosso banco de dados e não serão acessíveis por terceiros. Pela plataforma, os usuários terão acesso ao nome, localização e foto de perfil um dos outros.
                        

 
</p>
                    </li>

                    <li>
                        <p
                        className="ml-2"
                        >
                      Por fim, a plataforma deve ser utilizada somente por pessoas com 18 anos ou mais.

                        

 
</p>
                    </li>

                </ol>
                <Footer />
            </div>
        )
    }
}