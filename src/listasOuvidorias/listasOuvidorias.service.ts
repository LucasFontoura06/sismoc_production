import {
    addDoc,
    collection,
    doc,
    Firestore,
    getDoc,
    getDocs,
    setDoc,
    deleteDoc,
    Timestamp,
  } from 'firebase/firestore';
  import { Injectable, NotFoundException } from '@nestjs/common';
  import { ListasOuvidoria } from './entities/listasOuvidoria.entity';
  import { CONSTANTES } from '../common/constantes';
  import { firestore } from '../firebaseConfig';
  import { deleteObject, ref } from 'firebase/storage';
  import { storage } from 'src/firebaseConfig';
  
  @Injectable()
  export class ListasOuvidoriasService {
    
  
    async create(listasOuvidoria: ListasOuvidoria) {
      try {
        // console.log('Service recebeu:', listasOuvidoria);
        const listasCollectionRef = collection(firestore, CONSTANTES.FB_STATUS_LISTAS_OUVIDORIAS);
        
        // Limpar datas nulas ou inválidas
        if (listasOuvidoria.datas) {
          Object.keys(listasOuvidoria.datas).forEach(key => {
            if (!listasOuvidoria.datas[key]) {
              listasOuvidoria.datas[key] = null;
            }
          });
        }
        
        // Remover campos undefined ou null antes de salvar
        const dadosLimpos = Object.fromEntries(
          Object.entries(listasOuvidoria).filter(([_, v]) => v != null)
        );
        
        // console.log('Dados limpos para salvar:', dadosLimpos);
        
        const docRef = await addDoc(listasCollectionRef, dadosLimpos);
        
        // console.log('Documento criado com ID:', docRef.id);
        return { id: docRef.id, ...listasOuvidoria };
      } catch (error) {
        console.error('Erro detalhado:', error);
        throw error;
      }
    }
  
    async findAll() {
      const listas: ListasOuvidoria[] = [];
      try {
        const docRef = await getDocs(collection(firestore, CONSTANTES.FB_STATUS_LISTAS_OUVIDORIAS));
        docRef.docs.map((doc) => {
          listas.push({ id: doc.id, ...doc.data() } as ListasOuvidoria);
        });
        return listas;
      } catch (error) {
        console.error('Erro ao buscar listas de ouvidoria:', error);
        throw error;
      }
    }
  
    async findOne(id: string) {
      try {
        const docRef = doc(firestore, CONSTANTES.FB_STATUS_LISTAS_OUVIDORIAS, id);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() } as ListasOuvidoria;
        } else {
          throw new Error(`A Lista de Ouvidoria com o ID ${id} não foi encontrada`);
        }
      } catch (error) {
        console.error('Erro ao tentar buscar a lista de ouvidoria:', error);
        throw error;
      }
    }
  
    async update(id: string, listasOuvidoria: ListasOuvidoria) {
      try {
        const docRef = doc(firestore, CONSTANTES.FB_STATUS_LISTAS_OUVIDORIAS, id);
        
        // Limpar datas nulas ou inválidas
        if (listasOuvidoria.datas) {
          Object.keys(listasOuvidoria.datas).forEach(key => {
            if (!listasOuvidoria.datas[key]) {
              listasOuvidoria.datas[key] = null;
            }
          });
        }
        
        // Remover campos undefined antes de salvar
        const dadosLimpos = Object.fromEntries(
          Object.entries(listasOuvidoria).filter(([_, v]) => v !== undefined)
        );

        await setDoc(docRef, dadosLimpos, { merge: true });
        return { id, ...listasOuvidoria };
      } catch (error) {
        console.error(`Erro ao tentar atualizar a lista de ouvidoria com ID ${id}:`, error);
        throw error;
      }
    }
  
    async remove(id: string) {
      try {
        // Primeiro, buscar o documento para obter informações do arquivo
        const docRef = doc(firestore, CONSTANTES.FB_STATUS_LISTAS_OUVIDORIAS, id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new NotFoundException(`Lista com ID ${id} não encontrada`);
        }

        const listaData = docSnap.data();

        // Se existir arquivo, deletar do storage primeiro
        if (listaData.arquivo?.nome) {
          const storageRef = ref(storage, `listas/${listaData.arquivo.nome}`);
          try {
            await deleteObject(storageRef);
            // console.log('Arquivo deletado do storage com sucesso');
          } catch (storageError) {
            console.error('Erro ao deletar arquivo do storage:', storageError);
            // Continua a execução mesmo se falhar ao deletar do storage
          }
        }

        // Deletar o documento do Firestore
        await deleteDoc(docRef);
        // console.log(`Lista ${id} deletada com sucesso`);
        
        return { 
          success: true,
          message: `Lista de ouvidoria com ID ${id} removida com sucesso.` 
        };
      } catch (error) {
        console.error(`Erro ao tentar remover a lista de ouvidoria com ID ${id}:`, error);
        throw error;
      }
    }
  }
  