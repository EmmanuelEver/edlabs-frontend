import React, { FC, PropsWithChildren } from 'react'
import { AuthContext } from '..'

interface IProps extends PropsWithChildren {

}

const AuthProvider: FC<IProps > = ({children}) => {

  return (
    <AuthContext.Provider value={{}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider