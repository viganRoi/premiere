import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, IconButton, Box, TextField, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add, Close } from '@mui/icons-material';

const Notes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        if (savedNotes.length > 0) {
            setNotes(savedNotes);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const handleDeleteNote = (index) => {
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
    };

    const handleAddNote = () => {
        const newTitle = prompt("Shëno titullin:");
        if (newTitle) {
            const newNote = {
                title: newTitle,
                content: ""
            };
            setNotes([...notes, newNote]);
        }
    };

    const handleNoteChange = (index, event) => {
        const updatedNotes = [...notes];
        updatedNotes[index].content = event.target.value;
        setNotes(updatedNotes);
    };

    return (
        <Grid container spacing={8} overflow={'auto'} p={1} pb={2} height={'100%'}>
            {notes.map((note, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} height={'350px'}>
                    <Paper elevation={3} style={{ padding: '1rem', height: '100%', position: 'relative' }}>
                        <Typography textAlign={'center'} variant="h6">{note.title}</Typography>
                        <Divider sx={{mt: 1}}/>
                        <TextField
                            multiline
                            rows={7}
                            value={note.content}
                            onChange={(event) => handleNoteChange(index, event)}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                            }}
                            aria-label="delete"
                            onClick={() => handleDeleteNote(index)}
                        >
                            <Close />
                        </IconButton>
                    </Paper>
                </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4} height={'350px'}>
                <Paper elevation={3} style={{ padding: '1rem', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box  onClick={handleAddNote} sx={{ display: 'flex', flexDirection: 'column', userSelect: 'none', cursor: 'pointer' }}>
                        <IconButton
                            sx={{
                                ':hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            <Add />
                        </IconButton>
                        <Typography variant="body1">Shënim i ri</Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Notes;

