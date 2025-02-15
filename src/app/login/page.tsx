interface UserDTO {
    email: string;
    password: string;
}

export default function RegisterPage() {
    async function loginUser(user: UserDTO) {
        const response = await fetch(`http://localhost:3000/user/`, {});
    }

    return (
        <div className="flex flex-col items-center justify-center  bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-gray-900 text-center">
                    Fazer Login
                </h1>

                <form className="flex flex-col mt-4 space-y-4">

                    <div>
                        <label className="block text-gray-700 font-medium">
                            E-mail
                        </label>
                        <input
                            type="email"
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                            placeholder="Ex: joao@gmail.com"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">
                            Senha
                        </label>
                        <input
                            type="password"
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                            placeholder="Digite sua senha"
                        />
                    </div>

                    <button className="w-full bg-gray-900 text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition">
                        Criar Conta
                    </button>
                </form>
            </div>
        </div>
    );
}
