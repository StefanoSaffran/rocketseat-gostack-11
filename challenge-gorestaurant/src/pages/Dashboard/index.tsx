import React, { useState, useEffect, useCallback } from 'react';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { IFoodPlate } from '../../components/Food';
import { FoodsContainer } from './styles';

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const { data } = await api.get('/foods');

      setFoods(data);
    }

    loadFoods();
  }, []);

  const handleAddFood = useCallback(
    async (food: Omit<IFoodPlate, 'id' | 'available'>) => {
      try {
        const { data } = await api.post('/foods', { ...food, available: true });

        setFoods(oldFoods => [...oldFoods, data]);

        addToast({
          type: 'success',
          title: 'Novo prato adicionado',
          description: `${food.name} foi adicionado com sucesso`,
        });
      } catch (err) {
        console.log(err);
      }
    },
    [addToast],
  );

  const handleUpdateFood = useCallback(
    async (food: Omit<IFoodPlate, 'id' | 'available'>) => {
      try {
        const { data } = await api.put<IFoodPlate>(`/foods/${editingFood.id}`, {
          ...food,
          id: editingFood.id,
          available: editingFood.available,
        });

        const updatedFoods = foods.map(foodToMap =>
          foodToMap.id === data.id ? data : foodToMap,
        );

        setFoods(updatedFoods);

        addToast({
          type: 'success',
          title: 'Prato atualizado',
          description: `${food.name} foi atualizado com sucesso`,
        });
      } catch (err) {
        console.log(err);
      }
    },
    [editingFood.available, editingFood.id, foods, addToast],
  );

  const handleDeleteFood = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/foods/${id}`);

        setFoods(oldFoods => oldFoods.filter(food => food.id !== id));

        addToast({
          type: 'info',
          title: 'Prato removido',
          description: `O prato foi removido com sucesso`,
        });
      } catch (err) {
        console.log(err);
      }
    },
    [addToast],
  );

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const toggleEditModal = useCallback(() => {
    setEditModalOpen(!editModalOpen);
  }, [editModalOpen]);

  const handleEditFood = useCallback(
    (food: IFoodPlate) => {
      setEditingFood(food);
      toggleEditModal();
    },
    [toggleEditModal],
  );

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
