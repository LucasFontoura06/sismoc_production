import {
  addDoc,
  setDoc,
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc 
} from 'firebase/firestore';import { createUserWithEmailAndPassword} from 'firebase/auth';
import { getAuth } from 'firebase-admin/auth';
import { adminAuth, auth, firestore } from '../firebaseConfig';
import { Usuario } from './entities/usuario.entity';
import { CONSTANTES } from '../common/constantes';
import { Injectable } from '@nestjs/common';


@Injectable()
export class UsuariosService {
  async create(usuario: Usuario) {
    try {
      const user = await this.criarUsuarioAuth(usuario);
      const userCollectionRef = collection(firestore, 'usuarios');
      usuario.id = user.uid
      await addDoc(userCollectionRef, usuario);
      return {...usuario };
    } catch (error) {
      console.log(error);
    }
  }

  async criarUsuarioAuth(usuario: Usuario) {
    const userCredential = await createUserWithEmailAndPassword(auth, usuario.email, usuario.senha);
    const user = userCredential.user; 
    return user;
  }

  async findAll() {
    const usuarios: Usuario[] = [];
    const docRef = await getDocs(
      collection(firestore, CONSTANTES.FB_USUARIOS_COLLECTION),
    );
    docRef.docs.map((doc) => {
      // Incluir o ID do documento junto com os dados
      usuarios.push({ id: doc.id, ...doc.data() } as Usuario);
    });
    return usuarios;
  }

  async findOne(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_USUARIOS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error(`O Usuario com o ID ${id} não foi encontrado`);
      }
    } catch (error) {
      console.error('Erro encontrado ao tentar buscar o usuario:', error);
      throw error;  
    }
  }

  async update(id: string, usuario: Usuario) {
    try {
      const querySnapshot = await getDocs(
        query(
          collection(firestore, CONSTANTES.FB_USUARIOS_COLLECTION),
          where('id', '==', id)
        )
      );
  
      if (querySnapshot.empty) {
        throw new Error(`Usuário com ID ${id} não encontrado no Firestore`);
      }
  
      const userDoc = querySnapshot.docs[0];
      
      // Atualiza setor e o objeto perfil completo
      await updateDoc(doc(firestore, CONSTANTES.FB_USUARIOS_COLLECTION, userDoc.id), {
        setor: usuario.setor,
        perfil: {
          id: usuario.perfil.id,
          descricao: usuario.perfil.descricao
        }
      });
      
      const updatedDocSnap = await getDoc(doc(firestore, CONSTANTES.FB_USUARIOS_COLLECTION, userDoc.id));
      const updatedUser = {
        id,
        ...updatedDocSnap.data()
      };
      
      console.log(`Usuário ${id} atualizado com sucesso:`, updatedUser);
      return updatedUser;
    } catch (error) {
      console.error(`Erro ao atualizar usuário ${id}:`, error);
      throw error;
    }
  }

  async updateStatus(id: string, status: boolean) {
    try {
      // Primeiro, vamos encontrar o documento do usuário
      const querySnapshot = await getDocs(
        query(
          collection(firestore, CONSTANTES.FB_USUARIOS_COLLECTION),
          where('id', '==', id)
        )
      );
  
      if (querySnapshot.empty) {
        throw new Error(`Usuário com ID ${id} não encontrado no Firestore`);
      }
  
      // Pegar o primeiro documento encontrado
      const userDoc = querySnapshot.docs[0];
      
      // Atualizar status no Auth
      await adminAuth.updateUser(id, {
        disabled: !status
      });
      
      // Atualizar status no Firestore usando o ID do documento
      await updateDoc(doc(firestore, CONSTANTES.FB_USUARIOS_COLLECTION, userDoc.id), { 
        ativo: status 
      });
      
      // Buscar o documento atualizado
      const updatedDocSnap = await getDoc(doc(firestore, CONSTANTES.FB_USUARIOS_COLLECTION, userDoc.id));
      const updatedUser = { 
        id, 
        ...updatedDocSnap.data() 
      };
      
      console.log(`Status do usuário ${id} atualizado para ${status}`);
      return updatedUser;
    } catch (error) {
      console.error(`Erro ao atualizar status do usuário ${id}:`, error);
      throw error;
    }
  }
}