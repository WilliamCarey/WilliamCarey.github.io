class SubMatrixModel
{
	constructor(r, c, u)
	{
		this.u = u
		
		this.delegates = new Array()
	
		this.row_count = r
		this.column_count = c // must be word size of u

		this.a = new Array(this.row_count)
		this.b = new Array(this.row_count - 1)
	
		this.rows = new Array(this.row_count)

		for (var r = 0; r < this.row_count; r++)
		{
			this.rows[r] = new Array(this.column_count)
			for (var c = 0; c < this.column_count; c++)
			{
				this.rows[r][c] = "0"
			}
		}
	}
	
	addDelegate(delegate)
	{
		this.delegates.push(delegate)
	}
	valueAt(r,c)
	{
		return this.rows[r][c]
	}
	
	setValueAt(r,c,value)
	{
		this.rows[r][c] = value
	}
}

class SubMatrixViewController
{
	constructor(element)
	{
		this.element = element
		console.log(this.element)
		
		this.cells = document.createElement("table")
		this.element.appendChild(this.cells)
	}
	
	setModel(model)
	{
		this.model = model
		console.log("Setting sub-matrix view controller model to:", this.model);
	
		this.rows = Array.from({ length: this.model.row_count}, (v, i) => document.createElement("tr"))
		this.cells_for_row = Array.from({ length: this.model.column_count + 2}, (v, i) => [])
	
		this.rows.forEach((row, index)=> {
			this.cells_for_row[index] = Array.from({ length: this.model.column_count+2}, (v, i) => document.createElement("td"))
			for(var c = 0; c < this.model.column_count + 2; c++)
			{
				row.appendChild(this.cells_for_row[index][c])
			}
			this.cells.appendChild(row)
		});
	
		this.updateValues(this.model)
	}
	
	locationInString(s, u)
	{
		for (var x = 0; x < u.length - s.length + 1; x++)
		{
			var found = true
			for (var c = 0; c < s.length; c++)
			{
				if ((s[c] != u[x+c]) && u[x+c] != "w") found = false;
			}
			if (found) return x
		}
		return -1
	}
	
	updateValues(model)
	{
		// We need to calculate the offsets from $u$
		var u = this.model.u
		var p = this.model
		
		// First, construct a.
		var us = u.values.toString().split(',').join('')
		us = us + us.slice(0,p.column_count) // convert to upword.

		for (var r = 0; r < p.row_count; r++)
		{
			var prs = p.rows[r].toString().split(',').join('')
			p.a[r] = this.locationInString(prs, us)
			
			if (r > 0)
			{
				var b = p.a[r] - p.a[r - 1]
				var b = (b + u.length) % u.length
				p.b[r-1] = b
			}
		}
		
		this.rows.forEach((row, index)=>{
			this.cells_for_row[index][0].innerHTML = p.a[index]
			if (index == 0)
			{
				this.cells_for_row[index][1].innerHTML = "x"
			}
			else
			{
				this.cells_for_row[index][1].innerHTML = p.b[index-1]
			}
			
			for(var c = 0; c < this.model.column_count; c++)
			{
				this.cells_for_row[index][c+2].innerHTML = this.model.valueAt(index, c)
			}
		});
		
	}
	
	allValuesDidChange(model)
	{
		this.updateValues(model)
	}
	
}