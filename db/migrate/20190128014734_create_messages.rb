class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string :title, null: false
      t.text :content

      t.timestamps
    end
  end
end
