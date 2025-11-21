class AddFullTextSearchToProducts < ActiveRecord::Migration[8.0]
  def change
    add_column :products, :name_vector, :tsvector, as: "to_tsvector('simple', coalesce(name, ''))", stored: true
    add_index :products, :name_vector, using: :gin
  end
end
