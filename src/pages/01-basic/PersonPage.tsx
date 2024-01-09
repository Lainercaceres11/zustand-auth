import { WhiteCard } from '../../components';
import { usePersonStore } from '../../stores/person/person.store';



export const PersonPage = () => {

  const firstName = usePersonStore(state => state.firstname)
  const lastName = usePersonStore(state => state.lastName)

  const setFirstname = usePersonStore(state => state.setFirstname)
  const setLastname = usePersonStore(state => state.setLastname)
  return (
    <>
      <h1>Persona</h1>
      <p>Información que se compartirá a otro store, Session Storage y Firebase</p>
      <hr />

      <WhiteCard className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Primer Nombre
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Primer Nombre"
                    value={firstName}
                    onChange={(e)=> setFirstname(e.target.value) }
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Apellido"
                    value={lastName}
                    onChange={(e)=> setLastname(e.target.value) }
                  />
                </div>
              </div>
            </div>
  
            <pre className="bg-gray-200 p-5 rounded-[20px]">
              {
                JSON.stringify({
                  firstName,
                  lastName
                }, null, 2)
              }
            </pre>
          </form>
        </div>
      </WhiteCard>
    </>
  );
};